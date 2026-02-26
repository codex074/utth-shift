const XLSX = require('xlsx');
const workbook = XLSX.readFile('Excel/payment.xls');

for (const sheetName of workbook.SheetNames) {
  if (sheetName === 'เช้าบ่ายดึก') {
    const ws = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
    // Print row 5 to 40
    for(let i = 25; i < 40; i++) {
        if(data[i]) console.log(`Row ${i}:`, JSON.stringify(data[i]));
    }
  }
}
