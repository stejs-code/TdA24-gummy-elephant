'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const path = require('node:path');
const execa = require('execa');
const vite = require('vite');
const makeDebugger = require('debug');
const c = require('picocolors');
const utils = require('@antfu/utils');
const minimatch = require('minimatch');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

const path__default = /*#__PURE__*/_interopDefaultCompat(path);
const execa__default = /*#__PURE__*/_interopDefaultCompat(execa);
const makeDebugger__default = /*#__PURE__*/_interopDefaultCompat(makeDebugger);
const c__default = /*#__PURE__*/_interopDefaultCompat(c);

const PLUGIN_NAME = "vite:plugin:run";
const throttles = /* @__PURE__ */ new Set();
const debug = {
  default: makeDebugger__default(PLUGIN_NAME),
  runner: (name, ...debug2) => makeDebugger__default(`${PLUGIN_NAME}:${name.replaceAll(" ", ":")}`)(...debug2)
};
function warn(prefix, message) {
  process.stdout.write(c__default.bold(`${c__default.yellow(`(!) ${prefix}`)} ${message}
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
    input: utils.toArray("input" in options ? options.input : options)
  };
  return {
    name: PLUGIN_NAME,
    configResolved(config) {
      resolvedOptions.env = vite.loadEnv(config.mode ?? process.env.NODE_ENV ?? "development", process.cwd(), "");
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
    pattern = path__default.resolve(parameters.server.config.root, pattern).replaceAll("\\", "/");
    if (minimatch.minimatch(file, pattern)) {
      debug.runner(name, `pattern ${pattern} matched for ${c__default.gray(parameters.file)}`);
      return true;
    }
    return false;
  });
  debug.runner(name, `Patterns ${patternMatch ? "passed" : "did not pass"} for ${c__default.gray(parameters.file)} (${patterns.map((p) => path__default.resolve(parameters.server.config.root, p))})`);
  debug.runner(name, `Condition ${conditionPass ? "passed" : "did not pass"} for ${c__default.gray(parameters.file)}`);
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
  debug.default(`${c__default.gray(parameters.file)} changed, applying itsss handler...`);
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
    const { stdout, failed, exitCode } = await execa__default(
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

exports.default = run;
exports.run = run;
