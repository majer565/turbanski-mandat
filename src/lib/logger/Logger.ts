export class Logger {
  private infoColor = "\x1b[92m";
  private errorColor = "\x1b[31m";
  private warnColor = "\x1b[33m";
  private requestColor = "\x1b[34m";
  private reset = "\x1b[0m";

  constructor() {}

  info(message: string, request: Request) {
    console.log(
      "%s[INFO]%s[%s]%s[%s] %s%s",
      this.infoColor,
      this.warnColor,
      new Date().toDateString(),
      this.requestColor,
      request,
      this.reset,
      message
    );
  }

  error(message: string, request: Request) {
    console.log(
        "%s[ERROR]%s[%s]%s[%s] %s%s",
        this.errorColor,
        this.warnColor,
        new Date().toDateString(),
        this.requestColor,
        request,
        this.reset,
        message
      );
  }

  warn(message: string, request: Request) {
    console.log(
        "%s[WARNING]%s[%s]%s[%s] %s%s",
        this.warnColor,
        this.warnColor,
        new Date().toDateString(),
        this.requestColor,
        request,
        this.reset,
        message
      );
  }
}

export enum Request {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  AUTH = "AUTH",
}
