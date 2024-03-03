import React from 'react';
import * as XLSX from 'xlsx';

const ExportToExcelButton = ({ data, fileName, sheetName }) => {
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName || 'Sheet1');
    XLSX.writeFile(wb, fileName || 'exported-data.xlsx');
  };

  return (
    <i  onClick={() => exportToExcel()} className="bi bi-file-earmark-excel-fill"></i>

    // <button onClick={exportToExcel}>
    //   Export to Excel
    // </button>
  );
};

export default ExportToExcelButton;
