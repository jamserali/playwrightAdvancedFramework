
import moment from 'moment';
import * as EXCEL from 'xlsx'
import fs from 'fs';

interface TestRecord{
    skill1:string,
    skill2:string
}
// create a mrthod to read xlsx file

export function readExcel(filePath:string){
   const file= fs.readFileSync(filePath);
//    read workbook

const workbook = EXCEL.read(file)
const sheet = workbook.Sheets[workbook.SheetNames[0]]
const rowData:any[] = EXCEL.utils.sheet_to_json(sheet,{header:1})

const records: TestRecord[] = rowData.slice(1).map((column: any) => {
  const skill1 = typeof column[0] === 'number' ? convertExcelDate(column[0]) : column[0];
  const skill2 = typeof column[1] === 'number' ? convertExcelDate(column[1]) : column[1];
  return { skill1, skill2 };
});

return records  

}


function convertExcelDate(serial: number): string {
  const excelEpoch = new Date(1900, 0, 1); // Jan 1, 1900
  const days = Math.floor(serial) - 2; // Excel bug: treats 1900 as leap year
  const result = new Date(excelEpoch.getTime() + days * 86400000);
  return moment(result).format("MMMM YYYY"); // returns "December 2023"
}
