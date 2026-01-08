import { login } from "./auth.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const loginUser = async (req, res, next) => {
  try {
    const data = await login(req.body);
    res.status(200).json(new ApiResponse(data));
  } catch (err) {
    next(err);
  }
};
