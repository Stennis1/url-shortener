import { AppError } from "./AppError";

export class BadRequestError extends AppError {
    constructor (message = "Bad request") {
        super(message, 400);
    }
}

export class NotFoundError extends AppError {
    constructor (message = "Resource not found") {
        super(message, 404);
    }
}

export class GoneError extends AppError {
    constructor (message = "Resource no longer available") {
        super(message, 410);
    }
}

export class TooManyRequestsError extends AppError {
    constructor (message = "Too many requests") {
        super(message, 429);
    }
}