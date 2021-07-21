import XLSX from "xlsx";
import { saveAs } from "file-saver";

function saveAsExcel(wsData: string[][]) {
  function s2ab(s: any) {
    const buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    const view = new Uint8Array(buf); //create uint8array as viewer
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff; //convert to octet
    return buf;
  }

  // workbook 생성
  let wb = XLSX.utils.book_new();

  wb.Props = {
    CreatedDate: new Date(Date.now()),
  };

  // sheet명 생성
  wb.SheetNames.push("sheet 1");

  // 배열 데이터로 시트 데이터 생성
  let ws = XLSX.utils.aoa_to_sheet(wsData);
  wb.Sheets["sheet 1"] = ws;

  // 엑셀 파일 쓰기
  let wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

  // 엑셀 다운로드
  saveAs(
    new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
    "작업 지시서.xlsx"
  );
}

export default saveAsExcel;
