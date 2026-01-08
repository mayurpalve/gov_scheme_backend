import Region from "./region.model.js";
import District from "../district/district.model.js";
import { ApiError } from "../../../utils/ApiError.js";

export const createRegion = async (data, userId) => {
  if (data.districts?.length) {
    const count = await District.countDocuments({
      _id: { $in: data.districts }
    });

    if (count !== data.districts.length) {
      throw new ApiError(400, "One or more districts are invalid");
    }
  }

  const exists = await Region.findOne({
    code: data.code,
    deletedAt: null
  });

  if (exists) {
    throw new ApiError(400, "Region code already exists");
  }

  return Region.create({
    ...data,
    createdBy: userId
  });
};

export const listRegions = async () => {
  return Region.find({ deletedAt: null, isActive: true })
    .populate("districts", "name code")
    .sort({ name: 1 });
};
