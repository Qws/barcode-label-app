const electron = require('electron');
const fs = require('fs');
const pdf = require('html-pdf');
const templateManager = require("./template-manager");

const templatesFolder = "./templates/";
const fileName = "label-template.html";
let config = {
    "height":"3cm",
    "width":"5cm"
}

function createLabel(){
    let html = templateManager.createHtmlLabel();
    let path = templatesFolder + fileName;
    //create template html file and then build a pdf version from it.
    fs.writeFile(path, html, (error)=>{
      if (!error) {
        var html = fs.readFileSync(path, 'utf8');
        pdf.create(html, config).toFile('./bin/label.pdf', function(err, res) {
          if (err) return console.log(err);
          console.log(res); // { filename: '/bin/label.pdf' }
        });
      }
    });
  }

document.getElementById("btn-print-barcode").onclick = () => {
    let Print = electron.remote.require('./main').Print;
    let option = {
        "color":false,
    };
    Print(option);
}
document.getElementById("btn-create-pdf").onclick = () => {createLabel();}