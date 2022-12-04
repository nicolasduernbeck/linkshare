class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.statusCode = statusCode;
    this.status = String(message).startsWith('4') ? 'fail' : 'error';
  }
}

export default AppError;
