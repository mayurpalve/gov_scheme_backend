import express from "express";
import {
  createSchemeDefinition,
  getSchemeDefinition
} from "./schemeDefinition.controller.js";

import { protect } from "../../middlewares/auth.middleware.js";

import { checkSchemeAccess } from "./schemeDefinition.controller.js";

const router = express.Router();

router.use(protect);

// create / update definition
router.post("/", createSchemeDefinition);

// fetch by scheme
router.get("/:schemeId", getSchemeDefinition);



// check if logged-in user can fill scheme
router.get(
  "/:schemeId/access",
  checkSchemeAccess
);


export default router;
