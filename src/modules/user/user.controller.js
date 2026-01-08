import * as userService from "./user.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(new ApiResponse(user, "User created"));
  } catch (err) {
    next(err);
  }
};

export const setUserStatus = async (req, res, next) => {
  try {
    const user = await userService.toggleUserStatus(
      req.params.id,
      req.body.isActive
    );
    res.json(new ApiResponse(user, "User status updated"));
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await userService.softDeleteUser(req.params.id);
    res.json(new ApiResponse(user, "User deleted"));
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await userService.listUsers();
    res.json(new ApiResponse(users));
  } catch (err) {
    next(err);
  }
};
