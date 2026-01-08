import SchemeDefinition from "./schemeDefinition.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";
import { canUserFillScheme } from "./schemeAccess.service.js";

export const createSchemeDefinition = async (req, res, next) => {
  try {
    const { scheme, fields } = req.body;

    if (!scheme || !fields?.length) {
      throw new ApiError(400, "Scheme and fields are required");
    }

    const definition = await SchemeDefinition.findOneAndUpdate(
      { scheme },
      {
        scheme,
        fields,
        assignedRoles: req.body.assignedRoles || [],
        assignedUsers: req.body.assignedUsers || [],
        isPublic: req.body.isPublic || false
      },
      {
        upsert: true,
        new: true
      }
    );

    res.status(201).json(
      new ApiResponse(
        201,
        definition,
        "Scheme definition saved"
      )
    );
  } catch (err) {
    next(err);
  }
};

export const getSchemeDefinition = async (req, res, next) => {
  try {
    const def = await SchemeDefinition.findOne({
      scheme: req.params.schemeId,
      deletedAt: null
    });

    res.json(
      new ApiResponse(200, def, "Scheme definition fetched")
    );
  } catch (err) {
    next(err);
  }
};



export const checkSchemeAccess = async (req, res, next) => {
  try {
    const def = await SchemeDefinition.findOne({
      scheme: req.params.schemeId,
      deletedAt: null
    });

    if (!def) {
      throw new ApiError(404, "Scheme definition not found");
    }

    const allowed = canUserFillScheme({
      schemeDefinition: def,
      user: req.user
    });

    res.json(
      new ApiResponse(200, {
        allowed,
        reason: allowed
          ? "Access granted"
          : "User not allowed to fill this scheme"
      })
    );
  } catch (err) {
    next(err);
  }
};

