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
            if(filepath === "" || filepath === undefined){
                cmd = sumatraPDFExePath + " -print-dialog ../../../bin/label.pdf";
            } 
            else {
                cmd = sumatraPDFExePath + " -print-dialog " + filepath;
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