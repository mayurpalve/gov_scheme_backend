import District from "./district.model.js";
import Division from "../division/division.model.js";
import { ApiError } from "../../../utils/ApiError.js";

export const createDistrict = async (data, userId) => {
  const divisionExists = await Division.findById(data.division);
  if (!divisionExists) {
    throw new ApiError(400, "Invalid division");
  }

  const exists = await District.findOne({
    code: data.code,
    deletedAt: null
  });

  if (exists) {
    throw new ApiError(400, "District code already exists");
  }

  return District.create({
    ...data,
    createdBy: userId
  });
};

export const listDistricts = async (divisionId) => {
  const filter = { deletedAt: null, isActive: true };

  if (divisionId) {
    filter.division = divisionId;
  }

  return District.find(filter)
    .populate("division", "name code")
    .sort({ name: 1 });
};

