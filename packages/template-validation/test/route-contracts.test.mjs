import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import test from "node:test";
import {
  validateInvalidResponse,
  validatePageResponse,
  validateRedirectResponse,
  validateTemplateRouteConfig,
} from "../lib/route-contracts.mjs";

const completeRoute = {
  path: "/example",
  status: 200,
  title: "Example",
  canonical: "/example",
  marker: "Visible example",
};

test("normal routes require marker, title, and canonical", () => {
  const failures = validateTemplateRouteConfig({
    routes: [{ path: "/example", status: 200 }],
  });

  assert.ok(failures.some((failure) => failure.includes("marker is required")));
  assert.ok(failures.some((failure) => failure.includes("title or titleIncludes is required")));
  assert.ok(failures.some((failure) => failure.includes("canonical must be")));
});

test("exact titles pass and suffix mismatches fail", () => {
  const response = {
    status: 200,
    requestUrl: "http://127.0.0.1/example",
    html: '<title>Example</title><link rel="canonical" href="/example"><main>Visible example</main>',
  };

  assert.deepEqual(validatePageResponse(completeRoute, response), []);
  assert.ok(
    validatePageResponse(
      { ...completeRoute, title: "Example | Suffix" },
      response,
    ).some((failure) => failure.includes("does not equal")),
  );
});

test("script-only markers are not visible response text", () => {
  const failures = validatePageResponse(completeRoute, {
    status: 200,
    requestUrl: "http://127.0.0.1/example",
    html: '<title>Example</title><link rel="canonical" href="/example"><script>const marker = "Visible example";</script>',
  });

  assert.ok(
    failures.some(
      (failure) =>
        failure.includes("/example") && failure.includes("missing visible marker"),
    ),
  );
});

test("legacy titleIncludes remains supported", () => {
  const { title: _title, ...route } = completeRoute;
  const failures = validatePageResponse(
    { ...route, titleIncludes: "Example" },
    {
      status: 200,
      requestUrl: "http://127.0.0.1/example",
      html: '<title>Example | Legacy</title><link href="/example" rel="canonical"><main>Visible example</main>',
    },
  );

  assert.deepEqual(failures, []);
});

test("duplicate paths across route groups fail config validation", () => {
  const failures = validateTemplateRouteConfig({
    routes: [completeRoute],
    redirects: [{ path: "/example", status: 307, location: "/target" }],
  });

  assert.ok(failures.some((failure) => failure.includes("path duplicates routes[0]")));
});

test("trailing-slash aliases conflict across route groups", () => {
  const failures = validateTemplateRouteConfig({
    routes: [{ ...completeRoute, path: "/same", canonical: "/same" }],
    invalidRoutes: [{ path: "/same/", status: 404, marker: "Missing" }],
  });

  assert.ok(
    failures.some((failure) =>
      failure.includes("invalidRoutes[0] (/same/): path duplicates routes[0] (/same)"),
    ),
  );
});

test("redirect status must be explicitly redirecting", () => {
  const failures = validateTemplateRouteConfig({
    redirects: [{ path: "/old", status: 200, location: "/new" }],
  });

  assert.ok(failures.some((failure) => failure.includes("301, 302, 303, 307, 308")));
});

test("relative and absolute redirect Locations normalize to the contract path", () => {
  const contract = { path: "/old", status: 307, location: "/new" };
  const base = {
    status: 307,
    requestUrl: "http://127.0.0.1/old",
  };

  assert.deepEqual(
    validateRedirectResponse(contract, { ...base, location: "/new/" }),
    [],
  );
  assert.deepEqual(
    validateRedirectResponse(contract, {
      ...base,
      location: "http://localhost:3000/new",
    }),
    [],
  );
});

test("invalid routes require identity config and reject status mismatches", () => {
  const failures = validateTemplateRouteConfig({
    invalidRoutes: [{ path: "/missing", status: 200, marker: "" }],
  });

  assert.ok(failures.some((failure) => failure.includes("non-2xx")));
  assert.ok(failures.some((failure) => failure.includes("marker is required")));
  assert.deepEqual(
    validateInvalidResponse(
      { path: "/missing", status: 404, marker: "Not found" },
      {
        status: 200,
        html: '<script>self.__next_f.push("Not found")</script>',
      },
    ),
    ["/missing: expected 404, received 200"],
  );
});

test("every template config satisfies the route contract", async () => {
  const appsDirectory = fileURLToPath(new URL("../../../apps/", import.meta.url));
  const entries = await readdir(appsDirectory, { withFileTypes: true });
  const configPaths = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const configPath = `${appsDirectory}/${entry.name}/template.config.json`;
    try {
      await access(configPath);
      configPaths.push(configPath);
    } catch {
      // This workspace directory is not a runnable template.
    }
  }

  assert.equal(configPaths.length, 14);
  for (const configPath of configPaths.sort()) {
    const template = JSON.parse(await readFile(configPath, "utf8"));
    assert.deepEqual(
      validateTemplateRouteConfig(template),
      [],
      `${template.name} has an incomplete route contract`,
    );
  }
});
