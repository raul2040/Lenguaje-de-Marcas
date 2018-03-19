window.onload = ejecuta();
function ejecuta(){
    var textXML = '<preguntes><pregunta tipus="text"><text>Quin és el color del cel?</text>'+
    '<resposta>blau</resposta></pregunta></preguntes>';
    
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(textXML ,"text/xml");
    document.getElementById("p1").innerHTML = xmlDoc.getElementsByTagName("text")[0].childNodes[0].nodeValue;
    document.getElementById("t1").innerHTML = xmlDoc.getElementsByTagName("pregunta")[0].getAttribute("tipus");
    document.getElementById("r1").innerHTML = xmlDoc.getElementsByTagName("resposta")[0].childNodes[0].nodeValue;
}