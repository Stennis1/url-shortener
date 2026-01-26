import rateLimit from "express-rate-limit";

export const createRateLimiter = (
    maxRequests: number,
    windowMs: number
) => 
    rateLimit({
    windowMs,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: "Too many requests. Please try again later."
    },
});