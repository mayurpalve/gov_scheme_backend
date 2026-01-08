import Scheme from "../scheme/scheme.model.js";
import SchemeDefinition from "../schemeDefinition/schemeDefinition.model.js";
import { generateSchemeTemplate } from "./excelTemplate.service.js";

export const downloadSchemeTemplate = async (req, res, next) => {
  try {
    const scheme = await Scheme.findById(req.params.schemeId);
    const definition = await SchemeDefinition.findOne({
      scheme: req.params.schemeId,
      deletedAt: null
    });

    if (!scheme || !definition) {
      return res.status(404).json({
        message: "Scheme or definition not found"
      });
    }

    const workbook = await generateSchemeTemplate({
      scheme,
      definition
    });

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=scheme_${scheme._id}_template.xlsx`
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    next(err);
  }
};
