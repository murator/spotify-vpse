export class ErrorMessage {
  message: string;
  action?: string;

  constructor(message: string, action?: string) {
    this.message = message;
    this.action = action;
  }

}