import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "../../config/db.js";
import Region from "../../modules/master/region/region.model.js";

// ESM-safe __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to regions.json
const dataPath = path.join(
  __dirname,
  "data",
  "maharashtra",
  "regions.json"
);

// --- VALIDATIONS ---
if (!fs.existsSync(dataPath)) {
  console.error("❌ regions.json not found at:", dataPath);
  process.exit(1);
}

const regions = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

if (!Array.isArray(regions) || regions.length === 0) {
  console.error("❌ regions.json is empty or invalid");
  process.exit(1);
}

await connectDB();

let inserted = 0;
let skipped = 0;

for (const r of regions) {
  const result = await Region.updateOne(
    { code: r.code },
    {
      $setOnInsert: {
        name: r.name,
        code: r.code
      }
    },
    { upsert: true }
  );

  if (result.upsertedCount === 1) {
    inserted++;
    console.log(`✔ Region inserted: ${r.name}`);
  } else {
    skipped++;
  }
}

console.log("──────────────");
console.log(`✅ Regions processed: ${regions.length}`);
console.log(`🆕 Inserted: ${inserted}`);
console.log(`⏭ Skipped (already existed): ${skipped}`);
console.log("──────────────");

process.exit(0);
