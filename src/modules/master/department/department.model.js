import mongoose from "mongoose";
import { baseMasterFields } from "../baseMaster.model.js";

const departmentSchema = new mongoose.Schema(
  {
    ...baseMasterFields
  },
  { timestamps: true }
);

departmentSchema.index(
  { code: 1 },
  { unique: true, partialFilterExpression: { deletedAt: null } }
);

export default mongoose.model("Department", departmentSchema);
