const xlsx = require('xlsx');

function dumpLayout(filename) {
  const wb = xlsx.readFile(filename);
  const sheet = wb.Sheets[wb.SheetNames[0]];
  console.log('\n=============================');
  console.log('LAYOUT FOR:', filename);
  console.log('=============================');

  const data = xlsx.utils.sheet_to_json(sheet, { header: 1, defval: '' });

  let out = [];
  for (let r = 8; r < 20; r++) {
    if (!data[r]) continue;
    let rowValues = [];
    for (let c = 0; c < data[r].length; c++) {
      if (data[r][c] !== undefined && data[r][c] !== '') {
        let mergeInfo = '';
        if (sheet['!merges']) {
          const merge = sheet['!merges'].find(m => m.s.r === r && m.s.c === c);
          if (merge) {
            mergeInfo = ` [MERGE to R${merge.e.r}C${merge.e.c}]`;
          }
        }
        rowValues.push(`C${c}: "${data[r][c]}"${mergeInfo}`);
      }
    }
    if (rowValues.length > 0) {
      out.push(`Row ${r}: ` + rowValues.join(' | '));
    }
  }
  return out.join('\n');
}

const table1 = dumpLayout('Excel/table-pharm.tech.xlsx');
const table2 = dumpLayout('Excel/table-office.xlsx');

const fs = require('fs');
fs.writeFileSync('layout_dump.txt', table1 + '\n\n' + table2);
