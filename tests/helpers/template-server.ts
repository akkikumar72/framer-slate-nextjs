import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { createServer } from "node:net";
import path from "node:path";
import { createRequire } from "node:module";

type NormalRoute = {
  path: string;
  status: number;
  title?: string;
  titleIncludes?: string;
  canonical: string;
  marker: string;
};

type InvalidRoute = {
  path: string;
  status: number;
  marker: string;
};

type TemplateConfig = {
  name: string;
  slug: string;
  port: number;
  routePrefix?: string;
  routes: NormalRoute[];
  invalidRoutes: InvalidRoute[];
};

export type TemplateDescriptor = TemplateConfig & {
  appDirectory: string;
  packageName: string;
  packagePath: string;
  firstRoute: NormalRoute;
};

export type TemplateServer = {
  baseUrl: string;
  stop: () => Promise<void>;
  template: TemplateDescriptor;
};

const repositoryRoot = process.cwd();
const appsDirectory = path.join(repositoryRoot, "apps");

export function discoverTemplates(): TemplateDescriptor[] {
  return readdirSync(appsDirectory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((entry) => {
      const appDirectory = path.join(appsDirectory, entry.name);
      const packagePath = path.join(appDirectory, "package.json");
      const configPath = path.join(appDirectory, "template.config.json");
      if (!existsSync(packagePath) || !existsSync(configPath)) return [];

      const packageJson = JSON.parse(readFileSync(packagePath, "utf8")) as {
        name: string;
      };
      const config = JSON.parse(
        readFileSync(configPath, "utf8"),
      ) as TemplateConfig;
      const firstRoute = config.routes[0];
      if (!firstRoute) {
        throw new Error(`${config.name} has no normal route to use for readiness.`);
      }

      return [
        {
          ...config,
          appDirectory,
          packageName: packageJson.name,
          packagePath,
          firstRoute,
        },
      ];
    })
    .sort((left, right) => left.slug.localeCompare(right.slug));
}

export function findTemplate(slug: string) {
  const template = discoverTemplates().find((candidate) => candidate.slug === slug);
  if (!template) throw new Error(`Unknown template slug: ${slug}`);
  return template;
}

export async function startTemplate(
  template: TemplateDescriptor,
): Promise<TemplateServer> {
  const port = await choosePort(template.port);
  const baseUrl = `http://127.0.0.1:${port}`;
  const nextCli = createRequire(template.packagePath).resolve("next/dist/bin/next");
  const child = spawn(
    process.execPath,
    [nextCli, "start", "--hostname", "127.0.0.1", "--port", String(port)],
    {
      cwd: template.appDirectory,
      env: {
        ...process.env,
        NEXT_PUBLIC_SITE_URL: baseUrl,
      },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
  let output = "";
  const appendOutput = (chunk: Buffer) => {
    output = `${output}${chunk.toString()}`.slice(-12000);
  };
  child.stdout.on("data", appendOutput);
  child.stderr.on("data", appendOutput);
  const stop = createStop(child);

  try {
    await waitForReady(
      new URL(template.firstRoute.path, `${baseUrl}/`).toString(),
      child,
      () => output,
    );
  } catch (error) {
    await stop();
    throw error;
  }

  return { baseUrl, stop, template };
}

function createStop(child: ChildProcessWithoutNullStreams) {
  let closed = false;
  let stopping: Promise<void> | undefined;
  const close = new Promise<void>((resolve) => {
    child.once("close", () => {
      closed = true;
      resolve();
    });
  });

  return () => {
    stopping ??= (async () => {
      if (closed) return;
      child.kill("SIGTERM");
      await Promise.race([
        close,
        new Promise<void>((resolve) => setTimeout(resolve, 3000)),
      ]);
      if (!closed) child.kill("SIGKILL");
      await close;
    })();
    return stopping;
  };
}

async function choosePort(preferredPort: number) {
  for (const port of [preferredPort + 10000, preferredPort + 20000]) {
    if (await isPortAvailable(port)) return port;
  }
  throw new Error(`No isolated browser-test port is available for ${preferredPort}.`);
}

function isPortAvailable(port: number) {
  return new Promise<boolean>((resolve) => {
    const probe = createServer();
    probe.unref();
    probe.once("error", () => resolve(false));
    probe.listen({ host: "127.0.0.1", port }, () => {
      probe.close(() => resolve(true));
    });
  });
}

async function waitForReady(
  url: string,
  child: ChildProcessWithoutNullStreams,
  getOutput: () => string,
) {
  const deadline = Date.now() + 30000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(
        `Next.js server exited before becoming ready.\n${getOutput()}`,
      );
    }
    try {
      const response = await fetch(url, {
        signal: AbortSignal.timeout(Math.min(2000, deadline - Date.now())),
      });
      await response.arrayBuffer();
      return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }
  throw new Error(`Timed out waiting for Next.js server at ${url}.\n${getOutput()}`);
}
