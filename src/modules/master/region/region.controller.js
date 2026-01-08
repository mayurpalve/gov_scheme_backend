import * as service from "./region.service.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";

export const create = async (req, res, next) => {
  try {
    const region = await service.createRegion(req.body, req.user._id);
    res.status(201).json(new ApiResponse(region, "Region created"));
  } catch (err) {
    next(err);
  }
};

export const list = async (req, res, next) => {
  try {
    const data = await service.listRegions();
    res.json(new ApiResponse(data));
  } catch (err) {
    next(err);
  }
};
