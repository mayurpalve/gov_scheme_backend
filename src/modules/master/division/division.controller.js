import * as service from "./division.service.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";

export const create = async (req, res, next) => {
  try {
    const division = await service.createDivision(req.body, req.user._id);
    res.status(201).json(new ApiResponse(division, "Division created"));
  } catch (err) {
    next(err);
  }
};

export const list = async (req, res, next) => {
  try {
    const data = await service.listDivisions();
    res.json(new ApiResponse(data));
  } catch (err) {
    next(err);
  }
};
