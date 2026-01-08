import express from "express";
import { protect } from "../../../middlewares/auth.middleware.js";
import { hasPermission } from "../../../middlewares/permission.middleware.js";
import { PERMISSIONS } from "../../../constants/permissions.js";
import { create, list } from "./division.controller.js";

const router = express.Router();

// Create Division → Super Admin / Master managers
router.post(
  "/",
  protect,
  hasPermission(PERMISSIONS.MASTER_MANAGE),
  create
);

// List Divisions → any authenticated user
router.get("/", protect, list);

export default router;
