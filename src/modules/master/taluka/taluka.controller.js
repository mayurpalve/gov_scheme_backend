import * as service from "./taluka.service.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";

export const create = async (req, res, next) => {
  try {
    const taluka = await service.createTaluka(req.body, req.user._id);
    res.status(201).json(new ApiResponse(taluka, "Taluka created"));
  } catch (err) {
    next(err);
  }
};

export const list = async (req, res, next) => {
  try {
    const { district } = req.query;
    const data = await service.listTalukas(district);
    res.json(new ApiResponse(data));
  } catch (err) {
    next(err);
  }
};
