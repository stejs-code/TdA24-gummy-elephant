import path from 'node:path';
import execa from 'execa';
import { loadEnv } from 'vite';
import makeDebugger from 'debug';
import c from 'picocolors';
import { toArray } from '@antfu/utils';
import { minimatch } from 'minimatch';

const PLUGIN_NAME = "vite:plugin:run";
const throttles = /* @__PURE__ */ new Set();
const debug = {
  default: makeDebugger(PLUGIN_NAME),
  runner: (name, ...debug2) => makeDebugger(`${PLUGIN_NAME}:${name.replaceAll(" ", ":")}`)(...debug2)
};
function warn(prefix, message) {
  process.stdout.write(c.bold(`${c.yellow(`(!) ${prefix}`)} ${message}
`));
}
function run(options = []) {
  const silent = "silent" in options ? options.silent : void 0;
  const skipDts = "skipDts" in options ? options.skipDts : void 0;
  const resolvedOptions = {
    env: {},
    silent: silent ?? true,
    skipDts: skipDts ?? true,
    build: false,
    input: toArray("input" in options ? options.input : options)
  };
  return {
    name: PLUGIN_NAME,
    configResolved(config) {
      resolvedOptions.env = loadEnv(config.mode ?? process.env.NODE_ENV ?? "development", process.cwd(), "");
      resolvedOptions.build = config.command === "build";
      debug.default("Given options:", options);
      debug.default("Resolved options:", resolvedOptions);
      resolvedOptions.input.forEach((runner) => {
        if (runner.startup !== false) {
          handleRunnerCommand(resolvedOptions, runner);
        }
      });
    },
    handleHotUpdate({ file, server }) {
      if (resolvedOptions.skipDts && file.endsWith(".d.ts")) {
        return [];
      }
      handleReload(resolvedOptions, { file, server });
    }
  };
}
function canRunnerRun(runner, parameters) {
  const file = parameters.file.replaceAll("\\", "/");
  const name = getRunnerName(runner);
  const patterns = !Array.isArray(runner.pattern) ? [runner.pattern].filter(Boolean) : runner.pattern.filter(Boolean);
  const conditionPass = runner.condition?.(file);
  const patternMatch = patterns.some((pattern) => {
    pattern = path.resolve(parameters.server.config.root, pattern).replaceAll("\\", "/");
    if (minimatch(file, pattern)) {
      debug.runner(name, `pattern ${pattern} matched for ${c.gray(parameters.file)}`);
      return true;
    }
    return false;
  });
  debug.runner(name, `Patterns ${patternMatch ? "passed" : "did not pass"} for ${c.gray(parameters.file)} (${patterns.map((p) => path.resolve(parameters.server.config.root, p))})`);
  debug.runner(name, `Condition ${conditionPass ? "passed" : "did not pass"} for ${c.gray(parameters.file)}`);
  if (!patternMatch && !conditionPass) {
    debug.runner(name, "Neither condition or pattern passed, skipping.");
    return false;
  }
  return true;
}
function handleReload(options, parameters) {
  options.input.forEach((runner) => {
    if (!canRunnerRun(runner, parameters)) {
      return;
    }
    handleRunner(runner, options, parameters);
  });
}
function handleRunner(runner, options, parameters) {
  debug.default(`${c.gray(parameters.file)} changed, applying itsss handler...`);
  try {
    if (typeof runner.onFileChanged === "function") {
      runner.onFileChanged?.(parameters);
    }
    if (Array.isArray(runner.run)) {
      handleRunnerCommand(options, runner);
    }
  } catch (error) {
    warn(PLUGIN_NAME, `Handler failed for ${parameters.file}: ${error.message}`);
    debug.default("Full error:", error);
  }
}
function handleRunnerCommand(options, runner) {
  if (!runner.run) {
    return;
  }
  const name = getRunnerName(runner);
  if (options.build && runner.build === false) {
    debug.runner(name, "Skipping when building.");
    return;
  }
  if (throttles.has(name)) {
    debug.runner(name, "Skipping because of throttling.");
    return;
  }
  throttles.add(name);
  setTimeout(() => throttles.delete(name), runner.throttle ?? 500);
  debug.runner(name, "Running...");
  setTimeout(async () => {
    const { stdout, failed, exitCode } = await execa(
      getExecutable(options, getRunnerCommand(runner)),
      getRunnerArguments(runner),
      { stdout: options.silent ? "ignore" : "pipe" }
    );
    if (stdout && !options.silent) {
      process.stdout.write(stdout);
    }
    debug.runner(name, !failed ? "Ran successfully." : `Failed with code ${exitCode}.`);
  }, runner.delay ?? 50);
}
function getRunnerName(runner) {
  return runner.name || [getRunnerCommand(runner), ...getRunnerArguments(runner)].join(" ") || "<runner>";
}
function getRunnerArguments(runner) {
  const args = typeof runner.run === "function" ? runner.run() : runner.run ?? [];
  return args.slice(1) ?? [];
}
function getRunnerCommand(runner) {
  const args = typeof runner.run === "function" ? runner.run() : runner.run ?? [];
  return args?.[0];
}
function getExecutable(options, name) {
  if (!name) {
    throw new Error("No executable given.");
  }
  return process.env[`${name}_PATH`] || options.env[`${name}_PATH`] || name;
}

export { run as default, run };
