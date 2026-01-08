import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "../../config/db.js";
import District from "../../modules/master/district/district.model.js";
import Taluka from "../../modules/master/taluka/taluka.model.js";

// ESM-safe __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to talukas.json
const dataPath = path.join(
  __dirname,
  "data",
  "maharashtra",
  "talukas.json"
);

// --- VALIDATIONS ---
if (!fs.existsSync(dataPath)) {
  console.error("❌ talukas.json not found at:", dataPath);
  process.exit(1);
}

// Read JSON
const talukas = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

if (!Array.isArray(talukas) || talukas.length === 0) {
  console.error("❌ talukas.json is empty or invalid");
  process.exit(1);
}

await connectDB();

let inserted = 0;
let skipped = 0;

for (const t of talukas) {
  const district = await District.findOne({
    code: t.districtCode,
    deletedAt: null
  });

  if (!district) {
    console.warn(
      `⚠️ District not found for taluka: ${t.name} (${t.districtCode})`
    );
    skipped++;
    continue;
  }

  const result = await Taluka.updateOne(
    { code: t.code },
    {
      $setOnInsert: {
        name: t.name,
        code: t.code,
        district: district._id
      }
    },
    { upsert: true }
  );

  if (result.upsertedCount === 1) {
    inserted++;
    console.log(`✔ Taluka inserted: ${t.name}`);
  } else {
    skipped++;
  }
}

console.log("──────────────");
console.log(`✅ Talukas processed: ${talukas.length}`);
console.log(`🆕 Inserted: ${inserted}`);
console.log(`⏭ Skipped (already existed / missing district): ${skipped}`);
console.log("──────────────");

process.exit(0);
