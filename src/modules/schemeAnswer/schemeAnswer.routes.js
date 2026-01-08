import express from "express";
import { createSchemeAnswer } from "./schemeAnswer.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// protected for now (public will come later)
router.post("/", protect, createSchemeAnswer);

export default router;
