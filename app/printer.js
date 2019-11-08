const childProcess = require('child_process');
const electron  = require("electron");
let sumatraPDFExePath = electron.remote.app.getAppPath() + "\\app\\dependencies\\SumatraPDFReader\\SumatraPDF.exe";
let print = (filepath) =>{
    switch (process.platform) {
        case 'darwin':
        case 'linux':
            childProcess.exec(
                'lp ' + filepath, (e) => {
                    if (e) {
                        throw e;
                    }
                });
            break;
        case 'win32':
            let cmd = "";
            let extraCmds = "-print-settings \"fit,portrait\" "; //for settings and stuff.
            //sumatrapdf.exe -print-to "TEC B-EV4 (203dpi)" -print-settings "fit,portrait" "c:\tmp\test.pdf"
            let printerTypes = {};
            printerTypes[0] = " -print-to \"Microsoft Print to PDF\" ";
            let selectInt = 0;
            if(filepath === "" || filepath === undefined){
                cmd = sumatraPDFExePath + printerTypes[selectInt] +extraCmds+ " ../../../bin/label.pdf ";
            } 
            else {
                cmd = sumatraPDFExePath + printerTypes[selectInt] + extraCmds + filepath;
            }
            childProcess.exec(
                cmd, {
                    windowsHide: true
                }, (e) => {
                    if (e) {
                        throw e;
                    }
                });
            break;
        default:
            throw new Error(
                'Platform not supported.'
            );
    }
}

exports.print = print;