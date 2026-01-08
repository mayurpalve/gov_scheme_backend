import Scheme from "../scheme/scheme.model.js";
import SchemeDefinition from "../schemeDefinition/schemeDefinition.model.js";
import SchemeAnswer from "./schemeAnswer.model.js";

import { validateAnswerData } from "./validateAnswer.service.js";
import { checkDuplicateAnswer } from "./checkDuplicate.service.js";
import { isPublicSchemeAccessible } from "../schemeDefinition/publicAccess.service.js";

import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";

export const submitPublicSchemeAnswer = async (req, res, next) => {
  try {
    const { schemeId, data } = req.body;

    if (!schemeId || !data) {
      throw new ApiError(400, "schemeId and data are required");
    }

    const scheme = await Scheme.findById(schemeId);
    const definition = await SchemeDefinition.findOne({
      scheme: schemeId,
      deletedAt: null
    });

    if (!isPublicSchemeAccessible({ scheme, definition })) {
      throw new ApiError(404, "Scheme not available");
    }

    // validate data
    validateAnswerData({
      definition,
      data
    });

    // duplicate check (Phase 5 reuse)
    await checkDuplicateAnswer({
      schemeId,
      definition,
      data
    });

    const answer = await SchemeAnswer.create({
      scheme: schemeId,
      schemeDefinition: definition._id,
      data,
      filledBy: null,
      source: "PUBLIC"
    });

    res.status(201).json(
      new ApiResponse(
        201,
        answer,
        "Public scheme response submitted"
      )
    );
  } catch (err) {
    next(err);
  }
};
