import ExcelJS from "exceljs";

export const generateSchemeTemplate = async ({
  scheme,
  definition
}) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Data");

  // ---------- Row 1: hidden field keys ----------
  const keyRow = sheet.addRow(
    definition.fields.map(
      (f) => `__key__${f.key}`
    )
  );
  keyRow.hidden = true;

  // ---------- Row 2: visible labels ----------
  sheet.addRow(
    definition.fields.map((f) => f.label)
  );

  // ---------- Column validations ----------
  definition.fields.forEach((field, index) => {
    const col = sheet.getColumn(index + 1);

    // Required validation
    if (field.required) {
      col.eachCell({ includeEmpty: true }, (cell, rowNumber) => {
        if (rowNumber > 2) {
          cell.dataValidation = {
            type: "custom",
            formulae: [`LEN(TRIM(A${rowNumber}))>0`],
            showErrorMessage: true,
            error: `${field.label} is required`
          };
        }
      });
    }

    // Type validation
    if (field.type === "NUMBER" || field.type === "AMOUNT") {
      col.numFmt = "0";
    }

    if (field.type === "DATE") {
      col.numFmt = "yyyy-mm-dd";
    }

    // Dropdown (SELECT)
    if (field.type === "SELECT" && field.options?.length) {
      col.dataValidation = {
        type: "list",
        allowBlank: !field.required,
        formulae: [`"${field.options.join(",")}"`],
        showErrorMessage: true,
        error: "Invalid selection"
      };
    }

    col.width = Math.max(field.label.length + 5, 20);
  });

  return workbook;
};
