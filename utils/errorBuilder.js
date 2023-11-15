class ErrorBuilder extends Error {
    constructor(message, statusCode) {
      super(message);
  
      this.statusCode = statusCode;
    }
}
  
module.exports = ErrorBuilder;