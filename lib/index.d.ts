declare module "chai-exec" {
  const chaiExec: ChaiExec;
  export = chaiExec;

  interface ChaiExec {
    /**
     * The Chai-Exec plugin
     */
    (chai: Chai, util: ChaiUtil): void;

    /**
     * Synchronously executes the specified CLI and returns the results
     *
     * @param command - The command to execute
     * @param args - Command-line arguments to pass to the command
     * @param options - EZ-Spawn options
     * @returns - An EZ-Spawn Process object, or a ProcessError object
     */
    (command: string | string[]): Process | ProcessError;
    (command: string, args: string[]): Process | ProcessError;
    (command: string, ...args: string[]): Process | ProcessError;
    (command: string | string[], options: Options): Process | ProcessError;
    (command: string, args: string[], options: Options): Process | ProcessError;
    (command: string, arg1: string, options: Options): Process | ProcessError;
    (command: string, arg1: string, arg2: string, options: Options): Process | ProcessError;
    (command: string, arg1: string, arg2: string, arg3: string, options: Options): Process | ProcessError;
    (command: string, arg1: string, arg2: string, arg3: string, arg4: string, options: Options): Process | ProcessError;
    (command: string, arg1: string, arg2: string, arg3: string, arg4: string, arg5: string, options: Options): Process | ProcessError;
    (command: string | string[], options: BufferOptions): Process<Buffer> | ProcessError<Buffer>;
    (command: string, args: string[], options: BufferOptions): Process<Buffer> | ProcessError<Buffer>;
    (command: string, arg1: string, options: BufferOptions): Process<Buffer> | ProcessError<Buffer>;
    (command: string, arg1: string, arg2: string, options: BufferOptions): Process<Buffer> | ProcessError<Buffer>;
    (command: string, arg1: string, arg2: string, arg3: string, options: BufferOptions): Process<Buffer> | ProcessError<Buffer>;
    (command: string, arg1: string, arg2: string, arg3: string, arg4: string, options: BufferOptions): Process<Buffer> | ProcessError<Buffer>;
    (command: string, arg1: string, arg2: string, arg3: string, arg4: string, arg5: string, options: BufferOptions): Process<Buffer> | ProcessError<Buffer>;

    chaiExec: ChaiExec;
    chaiExecSync: ChaiExecSync;
    chaiExecAsync: ChaiExecAsync;
  }

  interface ChaiExecSync {
    /**
     * Synchronously executes the specified CLI and returns the results
     *
     * @param command - The command to execute
     * @param args - Command-line arguments to pass to the command
     * @param options - EZ-Spawn options
     * @returns - An EZ-Spawn Process object, or a ProcessError object
     */
    (command: string | string[]): Process | ProcessError;
    (command: string, args: string[]): Process | ProcessError;
    (command: string, ...args: string[]): Process | ProcessError;
    (command: string | string[], options: Options): Process | ProcessError;
    (command: string, args: string[], options: Options): Process | ProcessError;
    (command: string, arg1: string, options: Options): Process | ProcessError;
    (command: string, arg1: string, arg2: string, options: Options): Process | ProcessError;
    (command: string, arg1: string, arg2: string, arg3: string, options: Options): Process | ProcessError;
    (command: string, arg1: string, arg2: string, arg3: string, arg4: string, options: Options): Process | ProcessError;
    (command: string, arg1: string, arg2: string, arg3: string, arg4: string, arg5: string, options: Options): Process | ProcessError;
    (command: string | string[], options: BufferOptions): Process<Buffer> | ProcessError<Buffer>;
    (command: string, args: string[], options: BufferOptions): Process<Buffer> | ProcessError<Buffer>;
    (command: string, arg1: string, options: BufferOptions): Process<Buffer> | ProcessError<Buffer>;
    (command: string, arg1: string, arg2: string, options: BufferOptions): Process<Buffer> | ProcessError<Buffer>;
    (command: string, arg1: string, arg2: string, arg3: string, options: BufferOptions): Process<Buffer> | ProcessError<Buffer>;
    (command: string, arg1: string, arg2: string, arg3: string, arg4: string, options: BufferOptions): Process<Buffer> | ProcessError<Buffer>;
    (command: string, arg1: string, arg2: string, arg3: string, arg4: string, arg5: string, options: BufferOptions): Process<Buffer> | ProcessError<Buffer>;
  }

  interface ChaiExecAsync {
    /**
     * Asynchronously executes the specified CLI and returns the results via a Promise
     *
     * @param command - The command to execute
     * @param args - Command-line arguments to pass to the command
     * @param options - EZ-Spawn options
     * @returns - A Promise that resolves with an EZ-Spawn Process object, or a ProcessError object
     */
    (command: string | string[]): Promise<Process>;
    (command: string, args: string[]): Promise<Process>;
    (command: string, ...args: string[]): Promise<Process>;
    (command: string | string[], options: Options): Promise<Process>;
    (command: string, args: string[], options: Options): Promise<Process>;
    (command: string, arg1: string, options: Options): Promise<Process>;
    (command: string, arg1: string, arg2: string, options: Options): Promise<Process>;
    (command: string, arg1: string, arg2: string, arg3: string, options: Options): Promise<Process>;
    (command: string, arg1: string, arg2: string, arg3: string, arg4: string, options: Options): Promise<Process>;
    (command: string, arg1: string, arg2: string, arg3: string, arg4: string, arg5: string, options: Options): Promise<Process>;
    (command: string | string[], options: BufferOptions): Promise<Process<Buffer>>;
    (command: string, args: string[], options: BufferOptions): Promise<Process<Buffer>>;
    (command: string, arg1: string, options: BufferOptions): Promise<Process<Buffer>>;
    (command: string, arg1: string, arg2: string, options: BufferOptions): Promise<Process<Buffer>>;
    (command: string, arg1: string, arg2: string, arg3: string, options: BufferOptions): Promise<Process<Buffer>>;
    (command: string, arg1: string, arg2: string, arg3: string, arg4: string, options: BufferOptions): Promise<Process<Buffer>>;
    (command: string, arg1: string, arg2: string, arg3: string, arg4: string, arg5: string, options: BufferOptions): Promise<Process<Buffer>>;
  }
}
