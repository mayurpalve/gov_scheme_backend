import express from "express";
import { submitPublicSchemeAnswer } from "./publicSchemeAnswer.controller.js";
import { publicRateLimit } from "../../middlewares/rateLimit.middleware.js";


const router = express.Router();

// public submission
router.post("/submit", submitPublicSchemeAnswer);


router.post(
  "/submit",
  publicRateLimit,
  submitPublicSchemeAnswer
);

export default router;
