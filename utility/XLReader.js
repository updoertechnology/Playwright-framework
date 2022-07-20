var XLSX = require('xlsx');

class xlReader {
    constructor() {

    }
    // read xlsx file and retruns as a jsnon format
    readXL(filePath, sheetName) {
        var workbook = XLSX.readFile(filePath);
        var worksheet = workbook.Sheets[sheetName];
        return XLSX.utils.sheet_to_json(worksheet);
    }
    // write xlsx file with cell number
    writeXLData(writeFileName, writeSheetName, cellReference, cellValue) {
        let writeWorkbook = xlxs.readFile(writeFileName);
        let writeWorksheet = writeWorkbook.Sheets[writeSheetName];
        xlxs.utils.sheet_add_aoa(writeWorksheet, [[cellValue]], { origin: cellReference });
        xlxs.writeFile(writeWorkbook, writeFileName);
    }

    
    // read worksheet with start row number and end row number          
    readXLWithRows(filePath, sheetName, startRow, endRow) {
        var workbook = XLSX.readFile(filePath);
        var worksheet = workbook.Sheets[sheetName];
        let inputdata = [];
        inputdata = XLSX.utils.sheet_to_json(worksheet);
        let newData = [];
        let counter = 0;
        if(inputdata.length<endRow){
            console.log("End row number is bigger than length of the actual rows. Will get last row number as an end row number.");
            endRow=inputdata.length;
        }
        for (let i = startRow - 1; i < endRow; i++) {
            newData[counter] = inputdata[i];
            counter++;
        }
        return newData;
    }
}
module.exports = new xlReader();