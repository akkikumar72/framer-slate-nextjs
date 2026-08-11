const redirectStatuses = new Set([301, 302, 303, 307, 308]);

export function decodeHtml(value) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, code) =>
      String.fromCodePoint(Number.parseInt(code, 16)),
    )
    .replace(/&#(\d+);/g, (_, code) =>
      String.fromCodePoint(Number.parseInt(code, 10)),
    )
    .replace(/&(amp|quot|apos|nbsp|lt|gt);/gi, (entity) => {
      const decoded = {
        "&amp;": "&",
        "&quot;": '"',
        "&apos;": "'",
        "&nbsp;": " ",
        "&lt;": "<",
        "&gt;": ">",
      };
      return decoded[entity.toLowerCase()];
    });
}

export function extractTitle(html) {
  return normalizeWhitespace(
    decodeHtml(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? ""),
  );
}

export function extractCanonical(html) {
  for (const match of html.matchAll(/<link\b[^>]*>/gi)) {
    const tag = match[0];
    const rel = extractAttribute(tag, "rel");
    if (!rel?.split(/\s+/).some((value) => value.toLowerCase() === "canonical")) {
      continue;
    }
    return extractAttribute(tag, "href");
  }
  return null;
}

export function normalizeResponseText(html) {
  return normalizeWhitespace(
    decodeHtml(
      html
        .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
        .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
        .replace(/<!--([\s\S]*?)-->/g, " ")
        .replace(/<[^>]+>/g, " "),
    ),
  );
}

export function normalizePath(value) {
  if (value === "/") return value;
  return value.replace(/\/+$/, "") || "/";
}

export function validateTemplateRouteConfig(template) {
  const failures = [];
  const groups = [
    ["routes", template.routes ?? []],
    ["redirects", template.redirects ?? []],
    ["invalidRoutes", template.invalidRoutes ?? []],
  ];
  const paths = new Map();

  for (const [groupName, contracts] of groups) {
    if (!Array.isArray(contracts)) {
      failures.push(`${groupName}: expected an array`);
      continue;
    }

    for (const [index, contract] of contracts.entries()) {
      const label = `${groupName}[${index}]${isNonemptyString(contract?.path) ? ` (${contract.path})` : ""}`;

      if (!isRootRelativePath(contract?.path)) {
        failures.push(`${label}: path must be a root-relative path`);
      } else if (paths.has(normalizePath(contract.path))) {
        failures.push(
          `${label}: path duplicates ${paths.get(normalizePath(contract.path))}`,
        );
      } else {
        paths.set(normalizePath(contract.path), label);
      }

      if (groupName === "routes") {
        if (!is2xxStatus(contract?.status)) {
          failures.push(`${label}: status must be a 2xx integer`);
        }
        if (!isNonemptyString(contract?.marker)) {
          failures.push(`${label}: marker is required`);
        }
        if (!isRootRelativePath(contract?.canonical)) {
          failures.push(`${label}: canonical must be a root-relative path`);
        }
        if (
          !isNonemptyString(contract?.title) &&
          !isNonemptyString(contract?.titleIncludes)
        ) {
          failures.push(`${label}: title or titleIncludes is required`);
        }
      } else if (groupName === "redirects") {
        if (!redirectStatuses.has(contract?.status)) {
          failures.push(
            `${label}: status must be one of ${[...redirectStatuses].join(", ")}`,
          );
        }
        if (!isRootRelativePath(contract?.location)) {
          failures.push(`${label}: location must be a root-relative path`);
        }
      } else {
        if (!Number.isInteger(contract?.status) || is2xxStatus(contract.status)) {
          failures.push(`${label}: status must be a non-2xx integer`);
        }
        if (!isNonemptyString(contract?.marker)) {
          failures.push(`${label}: marker is required`);
        }
      }
    }
  }

  return failures;
}

export function validatePageResponse(contract, responseData) {
  const failures = [];
  const html = responseData.html ?? "";

  if (responseData.status !== contract.status) {
    failures.push(
      `${contract.path}: expected ${contract.status}, received ${responseData.status}`,
    );
  }

  const text = normalizeResponseText(html);
  if (!text.includes(contract.marker)) {
    failures.push(
      `${contract.path}: missing visible marker "${contract.marker}"`,
    );
  }

  if (contract.title) {
    const title = extractTitle(html);
    if (title !== contract.title) {
      failures.push(
        `${contract.path}: title "${title}" does not equal "${contract.title}"`,
      );
    }
  } else if (contract.titleIncludes) {
    const title = extractTitle(html);
    if (!title.includes(contract.titleIncludes)) {
      failures.push(
        `${contract.path}: title "${title}" does not include "${contract.titleIncludes}"`,
      );
    }
  }

  if (contract.canonical) {
    const canonical = extractCanonical(html);
    if (!canonical) {
      failures.push(`${contract.path}: canonical link is missing`);
    } else {
      const canonicalPath = normalizeUrlPath(
        canonical,
        responseData.requestUrl ?? responseData.baseUrl,
      );
      if (canonicalPath === null) {
        failures.push(`${contract.path}: canonical "${canonical}" is invalid`);
      } else if (canonicalPath !== normalizePath(contract.canonical)) {
        failures.push(
          `${contract.path}: canonical ${canonicalPath} does not match ${contract.canonical}`,
        );
      }
    }
  }

  return failures;
}

export function validateInvalidResponse(contract, responseData) {
  if (responseData.status === contract.status) return [];
  return [
    `${contract.path}: expected ${contract.status}, received ${responseData.status}`,
  ];
}

export function validateRedirectResponse(contract, responseData) {
  const failures = [];

  if (responseData.status !== contract.status) {
    failures.push(
      `${contract.path}: expected redirect ${contract.status}, received ${responseData.status}`,
    );
  }

  if (!responseData.location) {
    failures.push(`${contract.path}: redirect Location header is missing`);
    return failures;
  }

  const locationPath = normalizeUrlPath(
    responseData.location,
    responseData.requestUrl ?? responseData.baseUrl,
  );
  if (locationPath === null) {
    failures.push(
      `${contract.path}: redirect Location "${responseData.location}" is invalid`,
    );
  } else if (locationPath !== normalizePath(contract.location)) {
    failures.push(
      `${contract.path}: redirect Location ${locationPath} does not match ${contract.location}`,
    );
  }

  return failures;
}

function extractAttribute(tag, name) {
  const match = tag.match(
    new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"),
  );
  return match?.[1] ?? match?.[2] ?? match?.[3] ?? null;
}

function isNonemptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isRootRelativePath(value) {
  return isNonemptyString(value) && value.startsWith("/") && !value.startsWith("//");
}

function is2xxStatus(value) {
  return Number.isInteger(value) && value >= 200 && value < 300;
}

function normalizeWhitespace(value) {
  return value.replace(/\s+/g, " ").trim();
}

function normalizeUrlPath(value, baseUrl = "http://127.0.0.1/") {
  try {
    return normalizePath(new URL(value, baseUrl).pathname);
  } catch {
    return null;
  }
}
