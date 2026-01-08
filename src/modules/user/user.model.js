import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true,
      select: false
    },

    role: {
      type: String,
      enum: ["SUPER_ADMIN", "USER"],
      default: "USER"
    },

    permissions: {
      type: [String],
      default: []
    },

    isActive: {
      type: Boolean,
      default: true
    },

    deletedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

// Hash password before save
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});


export default mongoose.model("User", userSchema);
