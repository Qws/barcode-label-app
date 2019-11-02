exports.createHtmlLabel = () =>{
    let price = 2.20;
    let content = "<label>" + " Prijs: " + "</label>" + "<label>" + "€ " + String(price.toFixed(2)) + "</label>";
    let pageString = "<html>" + "<body>" + content + "</body>" + "</html>";
    return pageString
}