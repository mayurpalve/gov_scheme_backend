import { ApiError } from "../utils/ApiError.js";

export const hasPermission = (permission) => {
  return (req, res, next) => {
    if (req.user.role === "SUPER_ADMIN") return next();

    if (!req.user.permissions.includes(permission)) {
      return next(new ApiError(403, "Permission denied"));
    }

    next();
  };
};
