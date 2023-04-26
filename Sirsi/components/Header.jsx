import React from "react";
import Monitor from "../utils/analytics.png";
import Image from "next/image";
import DowloadButtons from "./DowloadButtons";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import XLSX from "xlsx";
import Filters from "./Filters";

export default function Header(props) {

  // Download as PDF
  const handleExportToPDF = () => {
    const input = document.getElementById("my-table");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210; // Ancho de la imagen en milímetros
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("table.pdf");
    });
  };

  // Download as EXCEL
  const handleExportToExcel = () => {
    const table = document.getElementById("my-table");

    let workbook = XLSX.utils.table_to_book(table);
    XLSX.writeFile(workbook, `archicvo.xlsx`);
  };

  // Print
  const handlePrintTable = () => {
    const table = document.getElementById("my-table");
    const printContent = table.outerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print()
    document.body.innerHTML = originalContent
  }

  return (
    <div className='navbar  opacity-navbar p-1 h-75 '>
      <div className='container-fluid d-flex justify-content-start col-3'>
        <span className='ps-3'>
          <Image src={Monitor} width={60} height={50} alt='monitor' />
        </span>
        <h1 className='text-dark sirsi'>SIRSI</h1>
      </div>

     <Filters />

      <DowloadButtons
        handleExportToExcel={handleExportToExcel}
        handleExportToPDF={handleExportToPDF}
        handlePrintTable={handlePrintTable}
      />
      
    </div>
  );
}
