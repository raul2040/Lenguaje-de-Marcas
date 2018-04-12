var xmlDoc;
var numPreguntas = 0;
var correccion = "";

window.onload = function () {
    leerXML();
};


function leerXML() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            xmlDoc = this.responseXML;
            numPreguntas = xmlDoc.getElementsByTagName('pregunta').length;

            imprimirPreguntas();
            imprimirBoton();
        }
    };
    xhttp.open("GET", "xml/questions.xml", true);
    xhttp.send();
}

function imprimirPreguntas() {

    for (var i = 0; i < numPreguntas; i++) {

        var tipo = xmlDoc.getElementsByTagName('pregunta')[i].getElementsByTagName('tipus')[0].innerHTML;

        switch (tipo) {
            case "select":
                crearRadio(i);
                break;
            case "selectMulti":
                crearCheck(i);
                break;
            case "text":
                crearText(i);
                break;
            default:
                console.log("default");
        }
    }
}

function imprimirCorrección() {

}


function crearRadio(i) {

    var numSol = xmlDoc.getElementsByTagName('pregunta')[i].getElementsByTagName('opcio').length;
    var element = document.getElementById("mainform");

    element.innerHTML = element.innerHTML + "<br/>";
    var enunciado = document.createElement("label");
    enunciado.setAttribute('class', "enunciado");
    enunciado.setAttribute('for', i);
    enunciado.innerHTML = i + "." + xmlDoc.getElementsByTagName('pregunta')[i].getElementsByTagName('text')[0].innerHTML + "<br>";
    element.appendChild(enunciado);


    for (var k = 0; k < numSol; k++) {

        var question = xmlDoc.getElementsByTagName('pregunta')[i].getElementsByTagName('opcio')[k].innerHTML;
        var radioBut = document.createElement("input");

        radioBut.setAttribute("type", "radio");
        radioBut.setAttribute("name", i);
        radioBut.setAttribute("value", k);
        radioBut.setAttribute('id', k + "radio");
        element.appendChild(radioBut);

        var label = document.createElement('label');
        label.innerHTML = question + "<br>";

        element.appendChild(label);
    }
}
function crearCheck(i) {
    var numSol = xmlDoc.getElementsByTagName('pregunta')[i].getElementsByTagName('opcio').length;
    var element = document.getElementById("mainform");
    element.innerHTML = element.innerHTML + "<br/>";
    var enunciado = document.createElement("label");
    enunciado.setAttribute('for', i);
    enunciado.setAttribute('class', "enunciado");
    enunciado.innerHTML = i + "." + xmlDoc.getElementsByTagName('pregunta')[i].getElementsByTagName('text')[0].innerHTML + "<br>";
    element.appendChild(enunciado);


    for (var k = 0; k < numSol; k++) {

        var question = xmlDoc.getElementsByTagName('pregunta')[i].getElementsByTagName('opcio')[k].innerHTML;
        var check = document.createElement("input");

        check.setAttribute("type", "checkbox");
        check.setAttribute("name", i);
        check.setAttribute("value", k);
        check.setAttribute('id', k + "check");
        element.appendChild(check);

        var label = document.createElement('label');
        label.innerHTML = question + "<br>";

        element.appendChild(label);
    }
}
function crearText(i) {
    var numSol = xmlDoc.getElementsByTagName('pregunta')[i].getElementsByTagName('opcio').length;
    var element = document.getElementById("mainform");

    element.innerHTML = element.innerHTML + "<br/>";
    var enunciado = document.createElement("label");
    enunciado.setAttribute('class', "enunciado");
    enunciado.setAttribute('name', i);
    enunciado.innerHTML = i + "." + xmlDoc.getElementsByTagName('pregunta')[i].getElementsByTagName('text')[0].innerHTML + "<br>";
    element.appendChild(enunciado);



    var textinp = document.createElement('input');
    textinp.setAttribute('type', "text");
    textinp.setAttribute('id', "text" + i);
    element.appendChild(textinp);
    var label = document.createElement('label');
    label.innerHTML = "<br>";

    element.appendChild(label);

}

function imprimirBoton() {
    var element = document.getElementById("mainform");
    element.innerHTML = element.innerHTML + "<br/>";
    var textinp = document.createElement('button');
    textinp.setAttribute('type', "button");
    textinp.setAttribute('onclick', "checkPreguntas()");
    textinp.innerHTML = "Comprueba tus respuestas!";
    element.appendChild(textinp);
    var corr = document.createElement('div');
    corr.setAttribute('id', "corr");
    element.appendChild(corr);
}

function checkPreguntas() {
    document.getElementById("corr").innerHTML = "<h3>Corrección:</h3><br/>";
    try {
        var numPreg = xmlDoc.getElementsByTagName('pregunta').length;

        for (var i = 0; i < numPreg; i++) {
            var tipo = xmlDoc.getElementsByTagName('pregunta')[i].getElementsByTagName("tipus")[0].innerHTML;

            if (tipo === "select") {
                checkRadio(i);
            }
            else if (tipo === "selectMulti") {
                checkCheckbox(i);
            }

            else if (tipo = "text") {
                checkText(i);
            }
        }
    }
    catch (exception) {
        alert("Debes rellenar todas las preguntas");
    }
}

function checkRadio(x) {
    var correcta = xmlDoc.getElementById("lol" + x).getElementsByTagName("resposta")[0].innerHTML;
    var opcions = document.getElementsByName(x);

    if (opcions[correcta].checked) {
        document.getElementById("corr").innerHTML = document.getElementById("corr").innerHTML + ("<spam style='color: green;'>" + x + " Correcto" + "<br/></spam>");
    }
    else {
        document.getElementById("corr").innerHTML = document.getElementById("corr").innerHTML + ("<spam style='color: red;'>" + x + " Incorrecto" + "<br/></spam>");
    }
}
function checkCheckbox(x) {
    var correctes = xmlDoc.getElementById("lol" + x).getElementsByTagName("resposta")[0].innerHTML.split(",");
    var opcions = document.getElementsByName(x);
    var correcta = true;
    for (i = 0; i < correctes.length; i++) {
        correctes[i] = parseInt(correctes[i]);
    }

    for (i = 0; i < opcions.length; i++) {

        if ((correctes.indexOf(i) != -1) && opcions[i].checked == false) {
            correcta = false;
        }
        else if ((correctes.indexOf(i) == -1) && opcions[i].checked == true) {
            correcta = false;
        }
    }
    if (correcta) {
        document.getElementById("corr").innerHTML = document.getElementById("corr").innerHTML + ("<spam style='color: green;'>" + x + " Correcto" + "<br/></spam>");
    }
    else {
        document.getElementById("corr").innerHTML = document.getElementById("corr").innerHTML + ("<spam style='color: red;'>" + x + " Incorrecto" + "<br/></spam>");
    }
}
function checkText(x) {

    var userAns = document.getElementById("text" + x).value;
    var resp = xmlDoc.getElementsByTagName("pregunta")[x].getElementsByTagName("resposta")[0].innerHTML;


    if (resp === userAns) {
        document.getElementById("corr").innerHTML = document.getElementById("corr").innerHTML + ("<spam style='color: green;'>" + x + " Correcto" + "<br/></spam>");
    }
    else {
        document.getElementById("corr").innerHTML = document.getElementById("corr").innerHTML + ("<spam style='color: red;'>" + x + " Incorrecto" + "<br/></spam>");
    }
}