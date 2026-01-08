/*
to globally apply the rate limit 

import { authRateLimit } from "./middlewares/rateLimit.middleware.js";

app.use("/api", authRateLimit);
 */


import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { errorHandler } from "./middlewares/error.middleware.js";

import {authRateLimit }from "./middlewares/rateLimit.middleware.js";

import authRoutes from "./modules/auth/auth.routes.js";

import userRoutes from "./modules/user/user.routes.js";

import departmentRoutes from "./modules/master/department/department.routes.js";

import divisionRoutes from "./modules/master/division/division.routes.js";

import districtRoutes from "./modules/master/district/district.routes.js";

import talukaRoutes from "./modules/master/taluka/taluka.routes.js";

import regionRoutes from "./modules/master/region/region.routes.js";

import schemeRoutes from "./modules/scheme/scheme.routes.js";

import schemeDefinitionRoutes from "./modules/schemeDefinition/schemeDefinition.routes.js";

import schemeAnswerRoutes from "./modules/schemeAnswer/schemeAnswer.routes.js";

import excelRoutes from "./modules/excel/excel.routes.js" ;

import excelUploadRoutes from "./modules/excel/excelUpload.routes.js";

import publicSchemeRoutes from "./modules/scheme/public.scheme.routes.js";

import publicSchemeAnswerRoutes from "./modules/schemeAnswer/publicSchemeAnswer.routes.js";



const app = express();

// Security
app.use(helmet());
app.use(cors());
app.use (authRateLimit) ; 

// Body parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan("dev"));

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", uptime: process.uptime() });
});

// Error handler (must be last)
app.use(errorHandler);

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/masters/departments", departmentRoutes);

app.use("/api/masters/divisions", divisionRoutes);

app.use("/api/masters/districts", districtRoutes);

app.use("/api/masters/talukas", talukaRoutes);

app.use("/api/masters/regions", regionRoutes);

app.use("/api/schemes", schemeRoutes);

app.use("/api/scheme-definitions",schemeDefinitionRoutes);

app.use("/api/scheme-answers", schemeAnswerRoutes);

app.use("/api/excel", excelRoutes);

app.use("/api/excel", excelUploadRoutes);

app.use("/api/public/schemes", publicSchemeRoutes);

app.use("/api/public/scheme-answers", publicSchemeAnswerRoutes);

export default app;
