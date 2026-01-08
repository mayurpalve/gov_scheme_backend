import express from "express";
import {
  createScheme,
  listSchemes
} from "./scheme.controller.js";

// ✅ correct named import
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// protect all scheme routes
router.use(protect);

router.post("/", createScheme);
router.get("/", listSchemes);

export default router;
