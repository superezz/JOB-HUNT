const PDFDocument = require("pdfkit");

exports.generatePDF = (text, res) => {
  const doc = new PDFDocument({
    margin: 40,
  });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=resume.pdf");

  doc.pipe(res);

  doc.fontSize(10).text(text.substring(0, 2000), {
    align: "left",
  });

  doc.end();
};
