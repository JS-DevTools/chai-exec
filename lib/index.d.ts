import { Options } from "@jsdevtools/ez-spawn";

/**
 * The Chai-Exec module
 *
 * @example
 * chai.use(chaiExec);
 */
declare const chaiExec: ChaiExec;

export = chaiExec;

interface ChaiExec extends ChaiExecSync {
  chaiExecSync: ChaiExecSync;
  chaiExecAsync: ChaiExecAsync;
}

/**
 * The Chai-Exec plugin
 *
 * @example
 * chai.use(chaiExec);
 */
type ChaiPlugin = (chai: Chai.ChaiStatic, util: object) => void;

interface ChaiExecSync extends ChaiPlugin {
  defaults: Defaults;

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

interface ChaiExecAsync extends ChaiPlugin {
  defaults: Defaults;

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


/**
 * Default values for all calls to `chaiExec` or `chaiExecAsync`
 */
interface Defaults {
  /**
   * The command to prepend to all calls
   */
  command?: string;

  /**
   * The args to prepend to all calls
   */
  args?: string | string[];

  /**
   * The options to use for all calls
   */
  options?: Options;
}


interface CLI {
  command: string;
  args: string[];
  pid: number;
  stdout: string;
  stderr: string;
  output: string;
  status: number;
  exitCode: number;
  signal: string | null;

  /**
   * Returns the command and arguments used to spawn the process
   */
  toString(): string;
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

      /**
       * Asserts that the CLI had the expected standard output
       *
       * @example
       * assert.stdout(cli, "Sucess!");
       * assert.stdout(cli, /^Sucess!$/);
       */
      stdout(cli: CLI, expected: string | RegExp, msg?: string);

      /**
       * Asserts that the CLI had the expected error output
       *
       * @example
       * assert.stderr(cli, "Failure!");
       * assert.stderr(cli, /^Failure!$/);
       */
      stderr(cli: CLI, expected: string | RegExp, msg?: string);

      /**
       * Asserts that the CLI had the expected output (stdout + stderr)
       *
       * @example
       * assert.output(cli, "Sucess!");
       * assert.output(cli, /^(Sucess|Failure)!$/);
       */
      output(cli: CLI, expected: string | RegExp, msg?: string);
    }

    interface Assertion {
      code: ExitCode;
      status: ExitCode;
      exitCode: ExitCode;
      stdout: Stdio;
      stderr: Stdio;
      output: Stdio;
    }

    interface LanguageChains {
      exit: Assertion;
    }

    interface TypeComparison {
      exit: Assertion;
      code: ExitCode;
      status: ExitCode;
      exitCode: ExitCode;
      stdout: Stdio;
      stderr: Stdio;
      output: Stdio;
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

    interface Stdio extends Assertion {
      /**
       * Asserts that the CLI had the expected output
       *
       * @example
       * cli.should.have.stdout(0);
       * cli.should.have.stderr.that.contains("Error Message");
       * cli.should.have.output.that.matches(/^Success!$/);
       */
      (expected: string, msg?: string): Assertion;
    }
  }
}
