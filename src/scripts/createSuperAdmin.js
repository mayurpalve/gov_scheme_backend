import mongoose from "mongoose";
import User from "../modules/user/user.model.js";
import { connectDB } from "../config/db.js";

const createSuperAdmin = async () => {
  await connectDB();

  const exists = await User.findOne({ role: "SUPER_ADMIN" });

  if (exists) {
    console.log("❌ Super Admin already exists");
    process.exit();
  }

  await User.create({
    name: "Super Admin",
    email: "admin@gov.local",
    password: "Admin@123",
    role: "SUPER_ADMIN",
    permissions: ["*"]
  });

  console.log("✅ Super Admin created");
  process.exit();
};

createSuperAdmin();
