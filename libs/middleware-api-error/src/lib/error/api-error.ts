import {Interfaces} from "@blogger/global-interfaces";

class ApiError {
  code: number;
  message: Interfaces.ErrorMessage;

  constructor(code: number, message: Interfaces.ErrorMessage) {
    this.code = code;
    this.message = message;
  }

  static badRequest(message) {
    return new ApiError(400, message);
  }

  static forbidden(message) {
    return new ApiError(403, message);
  }

  static unauthorized(message) {
    return new ApiError(401, message);
  }

  static notFound(message) {
    return new ApiError(404, message);
  }

  static conflict(message) {
    return new ApiError(409, message);
  }

  static unavailable(message) {
    return new ApiError(503, message);
  }
}

export default ApiError;
