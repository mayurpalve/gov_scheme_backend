import * as service from "./department.service.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";

export const create = async (req, res, next) => {
  try {
    const dept = await service.createDepartment(req.body, req.user._id);
    res.status(201).json(new ApiResponse(dept, "Department created"));
  } catch (err) {
    next(err);
  }
};

export const list = async (req, res, next) => {
  try {
    const data = await service.listDepartments();
    res.json(new ApiResponse(data));
  } catch (err) {
    next(err);
  }
};
