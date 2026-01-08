import Taluka from "./taluka.model.js";
import District from "../district/district.model.js";
import { ApiError } from "../../../utils/ApiError.js";

export const createTaluka = async (data, userId) => {
  const districtExists = await District.findById(data.district);
  if (!districtExists) {
    throw new ApiError(400, "Invalid district");
  }

  const exists = await Taluka.findOne({
    code: data.code,
    deletedAt: null
  });

  if (exists) {
    throw new ApiError(400, "Taluka code already exists");
  }

  return Taluka.create({
    ...data,
    createdBy: userId
  });
};

export const listTalukas = async (districtId) => {
  const filter = { deletedAt: null, isActive: true };

  if (districtId) {
    filter.district = districtId;
  }

  return Taluka.find(filter)
    .populate({
      path: "district",
      select: "name code",
      populate: {
        path: "division",
        select: "name code"
      }
    })
    .sort({ name: 1 });
};
