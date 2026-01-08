import ExcelJS from "exceljs";

export const parseExcelFile = async (buffer) => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer);

  const sheet = workbook.getWorksheet(1);
  if (!sheet) {
    throw new Error("Excel sheet not found");
  }

  // Row 1: hidden keys
  const keyRow = sheet.getRow(1);
  const keys = keyRow.values
    .slice(1)
    .map((v) =>
      typeof v === "string" && v.startsWith("__key__")
        ? v.replace("__key__", "")
        : null
    );

  if (keys.some((k) => !k)) {
    throw new Error("Invalid template: missing field keys");
  }

  const rows = [];

  sheet.eachRow((row, rowNumber) => {
    if (rowNumber <= 2) return; // skip key + header rows

    const data = {};

    row.values.slice(1).forEach((value, index) => {
      if (value !== null && value !== undefined && value !== "") {
        data[keys[index]] = value;
      }
    });

    if (Object.keys(data).length > 0) {
      rows.push({
        rowNumber,
        data
      });
    }
  });

  return rows;
};
