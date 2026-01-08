import express from "express";
import { protect } from "../../middlewares/auth.middleware.js";
import { downloadSchemeTemplate } from "./excel.controller.js";

const router = express.Router();

router.get(
  "/template/:schemeId",
  protect,
  downloadSchemeTemplate
);

export default router;
