import mongoose from "mongoose";

const fieldSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      trim: true
    },
    label: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      enum: ["TEXT", "NUMBER", "AMOUNT", "DATE", "SELECT"],
      required: true
    },
    required: {
      type: Boolean,
      default: false
    },
    options: {
      type: [String],
      default: []
    },
    uniqueGroup: {
      type: String,
      default: null
    }
  },
  { _id: false }
);

const schemeDefinitionSchema = new mongoose.Schema(
  {
    scheme: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scheme",
      required: true,
      unique: true
    },

    fields: {
      type: [fieldSchema],
      required: true
    },

    assignedRoles: {
      type: [String],
      default: []
    },

    assignedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    isPublic: {
      type: Boolean,
      default: false
    },

    deletedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "SchemeDefinition",
  schemeDefinitionSchema
);
