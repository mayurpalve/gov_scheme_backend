import express from "express";
import { protect } from "../../../middlewares/auth.middleware.js";
import { hasPermission } from "../../../middlewares/permission.middleware.js";
import { PERMISSIONS } from "../../../constants/permissions.js";
import { create, list } from "./taluka.controller.js";

const router = express.Router();

// Create taluka → Master managers
router.post(
  "/",
  protect,
  hasPermission(PERMISSIONS.MASTER_MANAGE),
  create
);

// List talukas (optionally by district)
router.get("/", protect, list);

export default router;
