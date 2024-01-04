import { Injectable, Scope, ConsoleLogger } from "@nestjs/common";

//@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger extends ConsoleLogger {
  public log(message: string) {
    /* your implementation */
    //super.setContext("TESTING");
    super.log(message);
  }
}
