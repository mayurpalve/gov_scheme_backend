


import SchemeDefinition from "../schemeDefinition/schemeDefinition.model.js";
import SchemeAnswer from "../schemeAnswer/schemeAnswer.model.js";
import { parseExcelFile } from "./excelUpload.service.js";
import { validateAnswerData } from "../schemeAnswer/validateAnswer.service.js";
import { checkDuplicateAnswer } from "../schemeAnswer/checkDuplicate.service.js";
import { canUserFillScheme } from "../schemeDefinition/schemeAccess.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const uploadExcelAnswers = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Excel file is required"
      });
    }
    
    const { schemeId } = req.params;

    const definition = await SchemeDefinition.findOne({
      scheme: schemeId,
      deletedAt: null
    });

    if (!definition) {
      return res.status(404).json({
        message: "Scheme definition not found"
      });
    }

    // Access check ONCE
    const allowed = canUserFillScheme({
      schemeDefinition: definition,
      user: req.user
    });

    if (!allowed) {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    const rows = await parseExcelFile(req.file.buffer);

    const result = {
      success: 0,
      failed: 0,
      errors: []
    };

    for (const row of rows) {
      try {
        validateAnswerData({
          definition,
          data: row.data
        });

        await checkDuplicateAnswer({
          schemeId,
          definition,
          data: row.data
        });

        await SchemeAnswer.create({
          scheme: schemeId,
          schemeDefinition: definition._id,
          data: row.data,
          filledBy: req.user._id,
          source: "EXCEL"
        });

        result.success++;
      } catch (err) {
        result.failed++;
        result.errors.push({
          row: row.rowNumber,
          message: err.message
        });
      }
    }

    res.json(
      new ApiResponse(
        200,
        result,
        "Excel upload processed"
      )
    );
  } catch (err) {
    next(err);
  }
};
