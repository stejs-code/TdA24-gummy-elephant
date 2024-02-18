import { ViteDevServer, Plugin } from 'vite';

interface ResolvedRunOptions {
    input: Runner[];
    silent: boolean;
    skipDts: boolean;
    env: Record<string, any>;
    build: boolean;
}
interface RunOptions {
    input?: Runner[] | Runner;
    /**
     * Hide output of commands
     * @default true
      */
    silent?: boolean;
    /**
     * Whether to skip hot updates when .d.ts files are changed.
     * @default true
     */
    skipDts?: boolean;
}
type Options = Runner[] | Runner | RunOptions;
type RunnerHandler = (parameters: RunnerHandlerParameters) => void;
interface RunnerHandlerParameters {
    file: string;
    server: ViteDevServer;
}
interface Runner {
    /**
   * Name to identify the runner.
   */
    name?: string;
    /**
     * Whether to run when starting the dev server or building for production (if `build` is not `false`).
     * @default true
     */
    startup?: boolean;
    /**
     * Whether to run when building for production.
     * @default true
     */
    build?: boolean;
    /**
     * Condition for the handler to run when a file changes.
     */
    condition?: (file: string) => boolean;
    /**
     * File changes must correspond to the given minimatch pattern.
     */
    pattern?: string | string[];
    /**
     * Executed when a watched file meets the condition.
     */
    onFileChanged?: RunnerHandler;
    /**
     * Shell command executed when a wacthed file meets the condition.
     */
    run?: string[] | (() => string[]);
    /**
   * Delay before running the handler is executed (in ms)
   * @default 50 ms
   */
    delay?: number;
    /**
     * Delay before the handler can be executed again (in ms)
     * @default 500 ms
     */
    throttle?: number;
}

/**
 * Reload when some files are changed.
 */
declare function run(options?: Options): Plugin;

export { type Options, type ResolvedRunOptions, type RunOptions, type Runner, type RunnerHandler, type RunnerHandlerParameters, run as default, run };
