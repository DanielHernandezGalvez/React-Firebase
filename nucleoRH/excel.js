function exportToExcel(e) {
  const table = document.getElementById("tableExcel"); 
  let workbook = XLSX.utils.table_to_book(table);
  XLSX.writeFile(workbook, `${e}.xlsx`);
}
