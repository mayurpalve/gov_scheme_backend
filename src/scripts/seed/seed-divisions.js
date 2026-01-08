import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "../../config/db.js";
import Division from "../../modules/master/division/division.model.js";

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read JSON safely
const filePath = path.join(
  __dirname,
  "data",
  "maharashtra",
  "divisions.json"
);

const divisions = JSON.parse(fs.readFileSync(filePath, "utf-8"));

await connectDB();

for (const div of divisions) {
  await Division.updateOne(
    { code: div.code },
    { $setOnInsert: div },
    { upsert: true }
  );
  console.log(`✔ Division seeded: ${div.name}`);
}

process.exit(0);
