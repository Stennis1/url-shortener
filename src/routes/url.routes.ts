import { Router } from "express";
import { createRateLimiter } from "../middleware/rateLimiter";
import { 
    healthCheck, redirectToLongUrl, shortenUrl 
} from "../controllers/url.controller";

const router = Router();

router.get("/health", healthCheck);
router.post("/shorten", createRateLimiter(10, 60 * 1000), shortenUrl);
router.get("/:shortCode", createRateLimiter(100, 60 * 1000), redirectToLongUrl);

export default router;