import { Request, Response } from "express";
import { createUrl, findByShortCode, incrementCounter, saveUrl } from "../repositories/url.repository";
import { getIdempotentResponse, saveIdempotentResponse } from "../repositories/idempotency.repository";
import { encodeBase62 } from "../utils/base62";
import { BadRequestError, GoneError, NotFoundError } from "../errors/HttpErrors";

export const healthCheck = (_req: Request, res: Response) => {
    res.json({ status: "ok"});
};

export const shortenUrl = (req: Request, res: Response) => {
    const { longUrl } = req.body;
    const idempotencyKey = req.header("Idempotency-Key");

    if (!longUrl) {
        throw new BadRequestError("longUrl is required");
    }

    if (idempotencyKey) {
        const cached = getIdempotentResponse(idempotencyKey);
        if (cached) {
            return res.status(cached.status).json(cached.body);
        }
    }

    const record = createUrl(longUrl);
    const shortCode = encodeBase62(record.id);

    record.shortCode = shortCode;
    saveUrl(record);

    const responseBody = {
        shortUrl: `http://localhost:3000/${shortCode}`,
        longUrl,
    };

    if (idempotencyKey) {
        saveIdempotentResponse(idempotencyKey, {
            status: 201,
            body: responseBody
        });
    }

    return res.status(201).json(responseBody);
};

export const redirectToLongUrl = (req: Request, res: Response) => {
    const shortCode = req.params.shortCode as string;

    const record = findByShortCode(shortCode);

    if (!record) {
        throw new NotFoundError("Short URL not found");
    }

    if (record.expiresAt && record.expiresAt < new Date()) {
        throw new GoneError("Short URL has expired");
    }

    incrementCounter(record);

    return res.redirect(301, record.longUrl);
}