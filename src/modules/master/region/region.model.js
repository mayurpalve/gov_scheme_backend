import mongoose from "mongoose";
import { baseMasterFields } from "../baseMaster.model.js";

const regionSchema = new mongoose.Schema(
  {
    ...baseMasterFields,
    districts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "District"
      }
    ]
  },
  { timestamps: true }
);

// Unique region code (soft delete safe)
regionSchema.index(
  { code: 1 },
  { unique: true, partialFilterExpression: { deletedAt: null } }
);

export default mongoose.model("Region", regionSchema);
