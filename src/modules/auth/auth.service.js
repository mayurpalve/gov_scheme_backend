import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../user/user.model.js";
import { env } from "../../config/env.js";
import { ApiError } from "../../utils/ApiError.js";

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email, deletedAt: null }).select("+password");

  if (!user || !user.isActive) {
    throw new ApiError(401, "Invalid credentials");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN }
  );

  return { token };
};
