import SchemeAnswer from "./schemeAnswer.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { extractUniqueGroups } from "../schemeDefinition/uniqueRules.util.js";

export const checkDuplicateAnswer = async ({
  schemeId,
  definition,
  data
}) => {
  const uniqueGroups = extractUniqueGroups(definition);

  for (const groupName of Object.keys(uniqueGroups)) {
    const keys = uniqueGroups[groupName];

    // Build query for this unique group
    const query = {
      scheme: schemeId,
      deletedAt: null
    };

    let hasAllKeys = true;

    for (const key of keys) {
      if (data[key] === undefined || data[key] === null) {
        hasAllKeys = false;
        break;
      }
      query[`data.${key}`] = data[key];
    }

    if (!hasAllKeys) continue;

    const exists = await SchemeAnswer.findOne(query);

    if (exists) {
      throw new ApiError(
        409,
        `Duplicate detected for unique group: ${groupName}`
      );
    }
  }
};
