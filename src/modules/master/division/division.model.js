import mongoose from "mongoose";
import { baseMasterFields } from "../baseMaster.model.js";

const divisionSchema = new mongoose.Schema(
  {
    ...baseMasterFields
  },
  { timestamps: true }
);

// Unique code, soft-delete safe
divisionSchema.index(
  { code: 1 },
  { unique: true, partialFilterExpression: { deletedAt: null } }
);

export default mongoose.model("Division", divisionSchema);
