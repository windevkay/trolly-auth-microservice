export class DatabaseConnectionError extends Error {
  failureReason = "Error connecting to database";
  constructor() {
    super();
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
