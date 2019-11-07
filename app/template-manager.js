exports.createHtmlLabel = () =>{
    let price = 2.20;
    let content = "<label>" + " Prijs: " + "</label>" + "<label>" + "€ " + String(price.toFixed(2)) + "</label>";
    let pageString = "<html>" + "<body>" + content + "</body>" + "</html>";
    return pageString
}

exports.createBarCodeHTML = (option, imagePath) =>{
    let img = document.createElement("img");
    img.id = "barcode";
    img.src = imagePath;
    img.setAttribute("jsbarcode-value", option.value);
    let text = document.createElement("p");
    text.textContent = "Hey!";
    let section = document.createElement("section");
    section.appendChild(img);
    section.appendChild(text);
    let pageString = "<html><body>"+ section.outerHTML + "</body></html>";
    return pageString;
}