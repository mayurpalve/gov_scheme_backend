import Scheme from "./scheme.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const createScheme = async (req, res, next) => {
  try {
    const scheme = await Scheme.create({
      ...req.body,
      createdBy: req.user._id
    });

    res.status(201).json(
      new ApiResponse(201, scheme, "Scheme created")
    );
  } catch (err) {
    next(err);
  }
};

export const listSchemes = async (req, res, next) => {
  try {
    const schemes = await Scheme.find({ deletedAt: null })
      .populate("department division district taluka region")
      .sort({ createdAt: -1 });

    res.json(
      new ApiResponse(200, schemes, "Schemes fetched")
    );
  } catch (err) {
    next(err);
  }
};
