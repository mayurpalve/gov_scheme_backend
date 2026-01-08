import SchemeAnswer from "./schemeAnswer.model.js";
import SchemeDefinition from "../schemeDefinition/schemeDefinition.model.js";
import { validateAnswerData } from "./validateAnswer.service.js";
import { canUserFillScheme } from "../schemeDefinition/schemeAccess.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";

export const createSchemeAnswer = async (req, res, next) => {
  try {
    const { schemeId, data, source = "ONLINE" } = req.body;

    const definition = await SchemeDefinition.findOne({
      scheme: schemeId,
      deletedAt: null
    });

    if (!definition) {
      throw new ApiError(404, "Scheme definition not found");
    }

    // access check (Phase 4.3 reuse)
    const allowed = canUserFillScheme({
      schemeDefinition: definition,
      user: req.user
    });

    if (!allowed) {
      throw new ApiError(403, "Access denied");
    }

    // validate data against definition
    validateAnswerData({
      definition,
      data
    });

    const answer = await SchemeAnswer.create({
      scheme: schemeId,
      schemeDefinition: definition._id,
      data,
      filledBy: req.user?._id || null,
      source
    });

    res.status(201).json(
      new ApiResponse(
        201,
        answer,
        "Scheme answer saved"
      )
    );
  } catch (err) {
    next(err);
  }
};
