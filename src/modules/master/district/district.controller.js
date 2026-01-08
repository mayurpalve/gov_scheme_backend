import * as service from "./district.service.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";

export const create = async (req, res, next) => {
  try {
    const district = await service.createDistrict(req.body, req.user._id);
    res.status(201).json(new ApiResponse(district, "District created"));
  } catch (err) {
    next(err);
  }
};

export const list = async (req, res, next) => {
  try {
    const { division } = req.query;
    const data = await service.listDistricts(division);
    res.json(new ApiResponse(data));
  } catch (err) {
    next(err);
  }
};
