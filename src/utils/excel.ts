import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
import moment from "moment";
import { schemaType } from "schema";

export function createExcelFile(schema: schemaType | string, dataList: any[]) {
  const workbook = new ExcelJS.Workbook();
  workbook.title = typeof schema === "string" ? schema : schema.name;
  workbook.creator = "샘터 재고 관리 시스템";
  workbook.created = new Date();
  workbook.modified = new Date();

  const sheet = workbook.addWorksheet("시트 1");

  // 헤더
  const columnKeys = Object.keys(
    typeof schema === "string" ? dataList[0] : schema.properties
  );
  sheet.getRow(1).values = columnKeys;
  const row = sheet.getRow(1);
  row.eachCell((cell, rowNumber) => {
    sheet.getColumn(rowNumber).alignment = {
      // 가운데 정렬
      vertical: "middle",
      horizontal: "center",
    };
    sheet.getColumn(rowNumber).font = { bold: true }; // 볼드 처리
  });

  sheet.columns = columnKeys.map((columnKey) => {
    return {
      key: columnKey,
      width: 15,
    };
  });

  for (let index = 0; index < dataList.length; index++) {
    sheet.getRow(index + 2).values = dataList[index];
  }

  return workbook;
}

export function downloadExcelFile(workbook: ExcelJS.Workbook) {
  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], { type: "applicationi/xlsx" });
    saveAs(blob, `${workbook.title}_${moment().format("YYYY-MM-DD")}.xlsx`);
  });
}
