const xlsx = require('xlsx');

function dumpLayout(filename) {
  const wb = xlsx.readFile(filename);
  const sheet = wb.Sheets[wb.SheetNames[0]];
  console.log('\n=============================');
  console.log('LAYOUT FOR:', filename);
  console.log('=============================');

  // Convert to JSON with header: 1 to get a 2D array
  const data = xlsx.utils.sheet_to_json(sheet, { header: 1, defval: '' });

  // Let's print the first 15 rows, but formatted so we can see column indices
  for (let r = 0; r < 20; r++) {
    if (!data[r]) continue;
    let rowValues = [];
    for (let c = 0; c < data[r].length; c++) {
      if (data[r][c] !== undefined && data[r][c] !== '') {
        // Find if this cell is part of a merge
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
      console.log(`Row ${r}: ` + rowValues.join(' | '));
    }
  }
}

dumpLayout('Excel/table-pharm.tech.xlsx');
dumpLayout('Excel/table-office.xlsx');
