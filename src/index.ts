import ezSpawn = require("ez-spawn");
import { BufferOptions, Callback, Options, Process, ProcessError } from "ez-spawn";
import { Chai, ChaiUtil } from "./chai";
import { exitCodeAssertions } from "./exit-code";

chaiExec.sync = chaiExecSync;
chaiExec.async = chaiExecAsync;
export = chaiExec;

// Many of the overload signatures in this file *could* be merged,
// but their usage is easier to understand as separate overlods
// tslint:disable: unified-signatures

/**
 * Adds the Chai-Exec plug-in to Chai.js
 */
function chaiExec(chai: Chai, util: ChaiUtil): void;

/**
 * Synchronously executes the specified CLI and returns the results
 */
function chaiExec(command: string | string[]): Process | ProcessError;
function chaiExec(command: string, args: string[]): Process | ProcessError;
function chaiExec(command: string, ...args: string[]): Process | ProcessError;
function chaiExec(command: string | string[], options: Options): Process | ProcessError;
function chaiExec(command: string, args: string[], options: Options): Process | ProcessError;
function chaiExec(command: string, arg1: string, options: Options): Process | ProcessError;
function chaiExec(command: string, arg1: string, arg2: string, options: Options): Process | ProcessError;
function chaiExec(command: string, arg1: string, arg2: string, arg3: string, options: Options): Process | ProcessError;
function chaiExec(command: string, arg1: string, arg2: string, arg3: string, arg4: string, options: Options): Process | ProcessError;
function chaiExec(command: string, arg1: string, arg2: string, arg3: string, arg4: string, arg5: string, options: Options): Process | ProcessError;
function chaiExec(command: string | string[], options: BufferOptions): Process<Buffer> | ProcessError<Buffer>;
function chaiExec(command: string, args: string[], options: BufferOptions): Process<Buffer> | ProcessError<Buffer>;
function chaiExec(command: string, arg1: string, options: BufferOptions): Process<Buffer> | ProcessError<Buffer>;
function chaiExec(command: string, arg1: string, arg2: string, options: BufferOptions): Process<Buffer> | ProcessError<Buffer>;
function chaiExec(command: string, arg1: string, arg2: string, arg3: string, options: BufferOptions): Process<Buffer> | ProcessError<Buffer>;
function chaiExec(command: string, arg1: string, arg2: string, arg3: string, arg4: string, options: BufferOptions): Process<Buffer> | ProcessError<Buffer>;
function chaiExec(command: string, arg1: string, arg2: string, arg3: string, arg4: string, arg5: string, options: BufferOptions): Process<Buffer> | ProcessError<Buffer>;

function chaiExec(arg1: unknown, arg2?: unknown): Process | ProcessError | Process<Buffer> | ProcessError<Buffer> | void {
  if (typeof arg1 === "string" || Array.isArray(arg1)) {
    // This is a pass-through to chaiExec.sync
    // @ts-ignore
    return chaiExecSync(...arguments);
  }

  // Add the ChaiExec plugin to Chai
  let chai = arg1 as Chai;
  let util = arg2 as ChaiUtil;

  exitCodeAssertions(chai, util);
}


/**
 * Synchronously executes the specified CLI and returns the results
 */
function chaiExecSync(command: string | string[]): Process | ProcessError;
function chaiExecSync(command: string, args: string[]): Process | ProcessError;
function chaiExecSync(command: string, ...args: string[]): Process | ProcessError;
function chaiExecSync(command: string | string[], options: Options): Process | ProcessError;
function chaiExecSync(command: string, args: string[], options: Options): Process | ProcessError;
function chaiExecSync(command: string, arg1: string, options: Options): Process | ProcessError;
function chaiExecSync(command: string, arg1: string, arg2: string, options: Options): Process | ProcessError;
function chaiExecSync(command: string, arg1: string, arg2: string, arg3: string, options: Options): Process | ProcessError;
function chaiExecSync(command: string, arg1: string, arg2: string, arg3: string, arg4: string, options: Options): Process | ProcessError;
function chaiExecSync(command: string, arg1: string, arg2: string, arg3: string, arg4: string, arg5: string, options: Options): Process | ProcessError;
function chaiExecSync(command: string | string[], options: BufferOptions): Process<Buffer> | ProcessError<Buffer>;
function chaiExecSync(command: string, args: string[], options: BufferOptions): Process<Buffer> | ProcessError<Buffer>;
function chaiExecSync(command: string, arg1: string, options: BufferOptions): Process<Buffer> | ProcessError<Buffer>;
function chaiExecSync(command: string, arg1: string, arg2: string, options: BufferOptions): Process<Buffer> | ProcessError<Buffer>;
function chaiExecSync(command: string, arg1: string, arg2: string, arg3: string, options: BufferOptions): Process<Buffer> | ProcessError<Buffer>;
function chaiExecSync(command: string, arg1: string, arg2: string, arg3: string, arg4: string, options: BufferOptions): Process<Buffer> | ProcessError<Buffer>;
function chaiExecSync(command: string, arg1: string, arg2: string, arg3: string, arg4: string, arg5: string, options: BufferOptions): Process<Buffer> | ProcessError<Buffer>;

function chaiExecSync(): Process | ProcessError | Process<Buffer> | ProcessError<Buffer> {
  try {
    // @ts-ignore
    return ezSpawn.sync.apply(ezSpawn, ...arguments);
  }
  catch (error) {
    return error as ProcessError;
  }
}


/**
 * Asynchronously executes the specified CLI and returns the results via a Promise
 */
function chaiExecAsync(command: string | string[]): Promise<Process>;
function chaiExecAsync(command: string, args: string[]): Promise<Process>;
function chaiExecAsync(command: string, ...args: string[]): Promise<Process>;
function chaiExecAsync(command: string | string[], options: Options): Promise<Process>;
function chaiExecAsync(command: string, args: string[], options: Options): Promise<Process>;
function chaiExecAsync(command: string, arg1: string, options: Options): Promise<Process>;
function chaiExecAsync(command: string, arg1: string, arg2: string, options: Options): Promise<Process>;
function chaiExecAsync(command: string, arg1: string, arg2: string, arg3: string, options: Options): Promise<Process>;
function chaiExecAsync(command: string, arg1: string, arg2: string, arg3: string, arg4: string, options: Options): Promise<Process>;
function chaiExecAsync(command: string, arg1: string, arg2: string, arg3: string, arg4: string, arg5: string, options: Options): Promise<Process>;
function chaiExecAsync(command: string | string[], options: BufferOptions): Promise<Process<Buffer>>;
function chaiExecAsync(command: string, args: string[], options: BufferOptions): Promise<Process<Buffer>>;
function chaiExecAsync(command: string, arg1: string, options: BufferOptions): Promise<Process<Buffer>>;
function chaiExecAsync(command: string, arg1: string, arg2: string, options: BufferOptions): Promise<Process<Buffer>>;
function chaiExecAsync(command: string, arg1: string, arg2: string, arg3: string, options: BufferOptions): Promise<Process<Buffer>>;
function chaiExecAsync(command: string, arg1: string, arg2: string, arg3: string, arg4: string, options: BufferOptions): Promise<Process<Buffer>>;
function chaiExecAsync(command: string, arg1: string, arg2: string, arg3: string, arg4: string, arg5: string, options: BufferOptions): Promise<Process<Buffer>>;

async function chaiExecAsync(): Promise<Process | ProcessError | Process<Buffer> | ProcessError<Buffer>> {
  try {
    // @ts-ignore
    // tslint:disable-next-line: no-void-expression await-promise
    return await ezSpawn.async.apply(ezSpawn, ...arguments);
  }
  catch (error) {
    return error as ProcessError;
  }
}
