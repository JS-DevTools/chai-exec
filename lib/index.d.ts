import chai = require("chai");
import { BufferOptions, Options, Process, ProcessError } from "ez-spawn";

// Aliases for EZ-Spawn types
declare type CLI = Process<string | Buffer> | ProcessError<string | Buffer>;

/**
 * The Chai-Exec module
 *
 * @example
 * chai.use(chaiExec);
 */
declare const chaiExec: ChaiExec;

export = chaiExec;

interface ChaiExec extends ChaiExecSync {
  /**
   * The Chai-Exec plugin
   *
   * @example
   * chai.use(chaiExec);
   */
  (chai: any, util: any): void;

  chaiExec: ChaiExec;
  chaiExecSync: ChaiExecSync;
  chaiExecAsync: ChaiExecAsync;
}

interface ChaiExecSync {
  /**
   * Synchronously executes the specified CLI and returns the results
   *
   * @param command - The command and arguments to execute
   */
  (command: string | string[]): CLI;

  /**
   * Synchronously executes the specified CLI and returns the results
   *
   * @param command - The command to execute
   * @param args - Command-line arguments to pass to the command
   */
  (command: string, args: string[]): CLI;

  /**
   * Synchronously executes the specified CLI and returns the results
   *
   * @param command - The command to execute
   * @param args - Command-line arguments to pass to the command
   */
  (command: string, ...args: string[]): CLI;

  /**
   * Synchronously executes the specified CLI and returns the results
   *
   * @param command - The command and arguments to execute
   * @param options - EZ-Spawn options
   */
  (command: string | string[], options: Options): CLI;

  /**
   * Synchronously executes the specified CLI and returns the results
   *
   * @param command - The command to execute
   * @param args - Command-line arguments to pass to the command
   * @param options - EZ-Spawn options
   */
  (command: string, args: string[], options: Options): CLI;

  /**
   * Synchronously executes the specified CLI and returns the results
   *
   * @param command - The command to execute
   * @param arg1 - The command-line argument to pass to the command
   * @param options - EZ-Spawn options
   */
  (command: string, arg1: string, options: Options): CLI;

  /**
   * Synchronously executes the specified CLI and returns the results
   *
   * @param command - The command to execute
   * @param arg1 - The first command-line argument to pass to the command
   * @param arg2 - The second command-line argument to pass to the command
   * @param options - EZ-Spawn options
   */
  (command: string, arg1: string, arg2: string, options: Options): CLI;

  /**
   * Synchronously executes the specified CLI and returns the results
   *
   * @param command - The command to execute
   * @param arg1 - The first command-line argument to pass to the command
   * @param arg2 - The second command-line argument to pass to the command
   * @param arg3 - The third command-line argument to pass to the command
   * @param options - EZ-Spawn options
   */
  (command: string, arg1: string, arg2: string, arg3: string, options: Options): CLI;

  /**
   * Synchronously executes the specified CLI and returns the results
   *
   * @param command - The command to execute
   * @param arg1 - The first command-line argument to pass to the command
   * @param arg2 - The second command-line argument to pass to the command
   * @param arg3 - The third command-line argument to pass to the command
   * @param arg4 - The fourth command-line argument to pass to the command
   * @param options - EZ-Spawn options
   */
  (command: string, arg1: string, arg2: string, arg3: string, arg4: string, options: Options): CLI;

  /**
   * Synchronously executes the specified CLI and returns the results
   *
   * @param command - The command to execute
   * @param arg1 - The first command-line argument to pass to the command
   * @param arg2 - The second command-line argument to pass to the command
   * @param arg3 - The third command-line argument to pass to the command
   * @param arg4 - The fourth command-line argument to pass to the command
   * @param arg5 - The fifth command-line argument to pass to the command
   * @param options - EZ-Spawn options
   */
  (command: string, arg1: string, arg2: string, arg3: string, arg4: string, arg5: string, options: Options): CLI;
}

interface ChaiExecAsync {
  /**
   * Asynchronously executes the specified CLI and returns the results via a Promise
   *
   * @param command - The command and arguments to execute
   */
  (command: string | string[]): Promise<CLI>;

  /**
   * Asynchronously executes the specified CLI and returns the results via a Promise
   *
   * @param command - The command to execute
   * @param args - Command-line arguments to pass to the command
   */
  (command: string, args: string[]): Promise<CLI>;

  /**
   * Asynchronously executes the specified CLI and returns the results via a Promise
   *
   * @param command - The command to execute
   * @param args - Command-line arguments to pass to the command
   */
  (command: string, ...args: string[]): Promise<CLI>;

  /**
   * Asynchronously executes the specified CLI and returns the results via a Promise
   *
   * @param command - The command and arguments to execute
   * @param options - EZ-Spawn options
   */
  (command: string | string[], options: Options): Promise<CLI>;

  /**
   * Asynchronously executes the specified CLI and returns the results via a Promise
   *
   * @param command - The command to execute
   * @param args - Command-line arguments to pass to the command
   * @param options - EZ-Spawn options
   */
  (command: string, args: string[], options: Options): Promise<CLI>;

  /**
   * Asynchronously executes the specified CLI and returns the results via a Promise
   *
   * @param command - The command to execute
   * @param arg1 - The command-line argument to pass to the command
   * @param options - EZ-Spawn options
   */
  (command: string, arg1: string, options: Options): Promise<CLI>;

  /**
   * Asynchronously executes the specified CLI and returns the results via a Promise
   *
   * @param command - The command to execute
   * @param arg1 - The first command-line argument to pass to the command
   * @param arg2 - The second command-line argument to pass to the command
   * @param options - EZ-Spawn options
   */
  (command: string, arg1: string, arg2: string, options: Options): Promise<CLI>;

  /**
   * Asynchronously executes the specified CLI and returns the results via a Promise
   *
   * @param command - The command to execute
   * @param arg1 - The first command-line argument to pass to the command
   * @param arg2 - The second command-line argument to pass to the command
   * @param arg3 - The third command-line argument to pass to the command
   * @param options - EZ-Spawn options
   */
  (command: string, arg1: string, arg2: string, arg3: string, options: Options): Promise<CLI>;

  /**
   * Asynchronously executes the specified CLI and returns the results via a Promise
   *
   * @param command - The command to execute
   * @param arg1 - The first command-line argument to pass to the command
   * @param arg2 - The second command-line argument to pass to the command
   * @param arg3 - The third command-line argument to pass to the command
   * @param arg4 - The fourth command-line argument to pass to the command
   * @param options - EZ-Spawn options
   */
  (command: string, arg1: string, arg2: string, arg3: string, arg4: string, options: Options): Promise<CLI>;

  /**
   * Asynchronously executes the specified CLI and returns the results via a Promise
   *
   * @param command - The command to execute
   * @param arg1 - The first command-line argument to pass to the command
   * @param arg2 - The second command-line argument to pass to the command
   * @param arg3 - The third command-line argument to pass to the command
   * @param arg4 - The fourth command-line argument to pass to the command
   * @param arg5 - The fifth command-line argument to pass to the command
   * @param options - EZ-Spawn options
   */
  (command: string, arg1: string, arg2: string, arg3: string, arg4: string, arg5: string, options: Options): Promise<CLI>;
}

declare global {
  namespace Chai {
    interface ChaiStatic {
      assert: Chai.AssertStatic;
    }

    interface AssertStatic {
      /**
       * Asserts that the CLI had one of the expected exit codes.
       *
       * @example
       * assert.exitCode(cli, 0);
       * assert.exitCode(cli, [1, 2, 3]);
       */
      exitCode(cli: CLI, exitCode: number | number[], msg?: string): void;

      /**
       * Asserts that the CLI did NOT exit with any of the specified exit codes.
       *
       * @example
       * assert.notExitCode(cli, 1);
       * assert.notExitCode(cli, [1, 2, 3]);
       */
      notExitCode(cli: CLI, exitCode: number | number[], msg?: string): void;

      /**
       * Asserts that the CLI exited with a code in the specified range (inclusive).
       *
       * @example
       * assert.exitCodeBetween(cli, 1, 5);
       */
      exitCodeBetween(cli: CLI, min: number, max: number, msg?: string);

      /**
       * Asserts that the CLI exited with a code that is NOT in the specified range (inclusive).
       *
       * @example
       * assert.exitCodeNotBetween(cli, 4, 7);
       */
      exitCodeNotBetween(cli: CLI, min: number, max: number, msg?: string);
    }

    interface Assertion {
      code: ExitCode;
      exitCode: ExitCode;
      with: ExitCode;
    }

    interface LanguageChains {
      exit: Assertion;
    }

    interface TypeComparison {
      exit: Assertion;
      code: ExitCode;
      exitCode: ExitCode;
    }

    interface ExitCode extends Assertion {
      /**
       * Asserts that the CLI had the expected exit code
       *
       * @example
       * cli.should.have.exitCode(0);
       * cli.should.have.an.exit.code.that.is.oneOf([1, 2, 3]);
       * cli.should.exit.with.a.code.that.is.above(100);
       */
      (exitCode: number, msg?: string): Assertion;
    }
  }
}
