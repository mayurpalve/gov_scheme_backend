import multer from "multer";

const storage = multer.memoryStorage();

export const uploadExcel = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      cb(null, true);
    } else {
      cb(
        new Error("Only .xlsx files are allowed"),
        false
      );
    }
  }
});
