
export class FailedFileLoadException extends Error {
  constructor(status: number) {
    super(`Failed file load. Response status: ${status}.`);
  }
}

