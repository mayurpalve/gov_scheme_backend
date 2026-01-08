import mongoose from "mongoose";
import { baseMasterFields } from "../baseMaster.model.js";

const districtSchema = new mongoose.Schema(
  {
    ...baseMasterFields,
    division: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Division",
      required: true
    }
  },
  { timestamps: true }
);

// Unique district code (soft delete safe)
districtSchema.index(
  { code: 1 },
  { unique: true, partialFilterExpression: { deletedAt: null } }
);

// For fast filtering by division
districtSchema.index({ division: 1 });

export default mongoose.model("District", districtSchema);
