import Department from "./department.model.js";
import { ApiError } from "../../../utils/ApiError.js";

export const createDepartment = async (data, userId) => {
  const exists = await Department.findOne({
    code: data.code,
    deletedAt: null
  });

  if (exists) {
    throw new ApiError(400, "Department code already exists");
  }

  return Department.create({
    ...data,
    createdBy: userId
  });
};

export const listDepartments = async () => {
  return Department.find({ deletedAt: null }).sort({ name: 1 });
};
