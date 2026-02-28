const xlsx = require('xlsx');

function dumpDetailed(filename) {
  const wb = xlsx.readFile(filename);
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet, { header: 1, defval: '' });

  console.log('=============');
  console.log(filename);
  console.log('=============');
  for (let r = 8; r < 20; r++) {
    if (!data[r]) continue;
    let rowValues = [];
    for (let c = 0; c < 30; c++) {
      let val = data[r][c] || '';
      let mStr = '';
      if (sheet['!merges']) {
        const merge = sheet['!merges'].find(m => m.s.r === r && m.s.c === c);
        if (merge) {
          mStr = `(merge: span ${(merge.e.c - merge.s.c + 1)} cols, ${(merge.e.r - merge.s.r + 1)} rows)`;
        }
      }
      if (val || mStr) {
        rowValues.push(`[C${c}]: "${val}" ${mStr}`.trim());
      }
    }
    if (rowValues.length > 0) console.log(`R${r}: `, rowValues.join(' | '));
  }
}

dumpDetailed('Excel/table-pharm.tech.xlsx');
dumpDetailed('Excel/table-office.xlsx');
