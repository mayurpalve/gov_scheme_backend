import mongoose from "mongoose";
import { baseMasterFields } from "../baseMaster.model.js";

const talukaSchema = new mongoose.Schema(
  {
    ...baseMasterFields,
    district: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "District",
      required: true
    }
  },
  { timestamps: true }
);

// Unique taluka code (soft delete safe)
talukaSchema.index(
  { code: 1 },
  { unique: true, partialFilterExpression: { deletedAt: null } }
);

// Fast filtering by district (Excel dropdowns)
talukaSchema.index({ district: 1 });

export default mongoose.model("Taluka", talukaSchema);
