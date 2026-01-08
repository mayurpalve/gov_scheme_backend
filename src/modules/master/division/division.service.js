import Division from "./division.model.js";
import { ApiError } from "../../../utils/ApiError.js";

export const createDivision = async (data, userId) => {
  const exists = await Division.findOne({
    code: data.code,
    deletedAt: null
  });

  if (exists) {
    throw new ApiError(400, "Division code already exists");
  }

  return Division.create({
    ...data,
    createdBy: userId
  });
};

export const listDivisions = async () => {
  return Division.find({ deletedAt: null, isActive: true }).sort({ name: 1 });
};
