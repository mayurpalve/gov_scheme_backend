import express from "express";
import { protect } from "../../middlewares/auth.middleware.js";
import { uploadExcel } from "../../middlewares/upload.middleware.js";
import { uploadExcelAnswers } from "./excelUpload.controller.js";

const router = express.Router();

router.post(
  "/upload/:schemeId",
  protect,
  uploadExcel.single("file"), // ✅ MUST be before controller
  uploadExcelAnswers
);

export default router;