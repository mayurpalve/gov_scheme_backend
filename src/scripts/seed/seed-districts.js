import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "../../config/db.js";
import Division from "../../modules/master/division/division.model.js";
import District from "../../modules/master/district/district.model.js";

// Resolve __dirname (ESM safe)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load districts JSON
const filePath = path.join(
  __dirname,
  "data",
  "maharashtra",
  "districts.json"
);

const districts = JSON.parse(fs.readFileSync(filePath, "utf-8"));

await connectDB();

for (const dist of districts) {
  const division = await Division.findOne({ code: dist.divisionCode });

  if (!division) {
    console.log(`❌ Division not found for district: ${dist.name}`);
    continue;
  }

  await District.updateOne(
    { code: dist.code },
    {
      $setOnInsert: {
        name: dist.name,
        code: dist.code,
        division: division._id
      }
    },
    { upsert: true }
  );

  console.log(`✔ District seeded: ${dist.name}`);
}

process.exit(0);
