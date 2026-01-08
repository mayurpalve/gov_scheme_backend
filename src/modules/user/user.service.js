import User from "./user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { PERMISSIONS } from "../../constants/permissions.js";

export const createUser = async (payload) => {
  const exists = await User.findOne({ email: payload.email, deletedAt: null });
  if (exists) {
    throw new ApiError(400, "User already exists");
  }

  return User.create(payload);
};

export const toggleUserStatus = async (id, isActive) => {
  const user = await User.findById(id);
  if (!user) throw new ApiError(404, "User not found");

  user.isActive = isActive;
  await user.save();
  return user;
};

export const softDeleteUser = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new ApiError(404, "User not found");

  user.deletedAt = new Date();
  await user.save();
  return user;
};

export const listUsers = async () => {
  return User.find({ deletedAt: null }).select("-password");
};

const ALL_PERMISSIONS = Object.values(PERMISSIONS);

export const updateUserPermissions = async (id, permissions) => {
  const invalid = permissions.filter(p => !ALL_PERMISSIONS.includes(p));
  if (invalid.length) {
    throw new ApiError(400, `Invalid permissions: ${invalid.join(", ")}`);
  }

  return User.findByIdAndUpdate(id, { permissions }, { new: true });
};
