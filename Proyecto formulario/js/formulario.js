var xmlDoc;
var numquestions = 0;
var correctas = 0;
var incorrectas = 0;

window.onload = function () {
    leerXML();
};


function leerXML() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            xmlDoc = this.responseXML;
            numquestions = xmlDoc.getElementsByTagName('question').length;

            intervalo();
            imprimirquestions();
            imprimirBoton();
        }
    };
    xhttp.open("GET", "questions.xml", true);
    xhttp.send();
}

function intervalo() {
    var salida = document.getElementById("tiempo"),
        minutos = 10,
        segundos = 0,
        intervalo = setInterval(function () {

            if (--segundos < 0) {
                segundos = 59;
                minutos--;
            }

            if (minutos && segundos == 0)
                checkquestions();
                clearInterval(intervalo);


            salida.innerHTML = minutos + ":" + (segundos < 10 ? "0" + segundos : segundos);
        }, 1000);
}

function imprimirquestions() {

    for (var i = 0; i < numquestions; i++) {

        var tipo = xmlDoc.getElementsByTagName('question')[i].getElementsByTagName('type')[0].innerHTML;

        switch (tipo) {
            case "select":
                crearRadio(i);
                break;
            case "multiple":
                crearCheck(i);
                break;
            case "text":
                crearText(i);
                break;
            case "check":
                crearCheck(i);
                break;
            case "radio":
                crearRadio(i);
                break;
            default:
                console.log("default");
        }
    }
}

function imprimirBoton() {
    var element = document.getElementById("mainform"); 
    // Obtenemos el formulario
    element.innerHTML = element.innerHTML + "<br/>";
    var textinp = document.createElement('button');
    // Creamos el boton
    textinp.setAttribute('type', "button");
    textinp.setAttribute('onclick', "checkquestions()");
    // Le seteamos varios atributos, uno de ellos que cuando haga click sobre el boton llame a la función checkquestions.
    textinp.innerHTML = "Comprueba tus respuestas!";
    element.appendChild(textinp);
    // Añadimos el boton al final del formulario.
    var corr = document.createElement('div');
    corr.setAttribute('id', "corr");
    element.appendChild(corr);
    // Creamos un div y le seteamos un id(corr) y lo añadimos debajo del boton.
}

function crearRadio(i) {

    var numSol = xmlDoc.getElementsByTagName('question')[i].getElementsByTagName('option').length;
    var element = document.getElementById("mainform");

    element.innerHTML = element.innerHTML + "<br/>";
    var enunciado = document.createElement("label");
    enunciado.setAttribute('class', "enunciado");
    enunciado.setAttribute('for', i);
    enunciado.innerHTML = xmlDoc.getElementsByTagName('question')[i].getElementsByTagName('title')[0].innerHTML + "<br>";
    element.appendChild(enunciado);


    for (var k = 0; k < numSol; k++) {

        var question = xmlDoc.getElementsByTagName('question')[i].getElementsByTagName('option')[k].innerHTML;
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
    var numSol = xmlDoc.getElementsByTagName('question')[i].getElementsByTagName('option').length;
    var element = document.getElementById("mainform");
    element.innerHTML = element.innerHTML + "<br/>";
    var enunciado = document.createElement("label");
    enunciado.setAttribute('for', i);
    enunciado.setAttribute('class', "enunciado");
    enunciado.innerHTML =  xmlDoc.getElementsByTagName('question')[i].getElementsByTagName('title')[0].innerHTML + "<br>";
    element.appendChild(enunciado);


    for (var k = 0; k < numSol; k++) {

        var question = xmlDoc.getElementsByTagName('question')[i].getElementsByTagName('option')[k].innerHTML;
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
    var numSol = xmlDoc.getElementsByTagName('question')[i].getElementsByTagName('option').length;
    var element = document.getElementById("mainform");

    element.innerHTML = element.innerHTML + "<br/>";
    var enunciado = document.createElement("label");
    enunciado.setAttribute('class', "enunciado");
    enunciado.setAttribute('name', i);
    enunciado.innerHTML = xmlDoc.getElementsByTagName('question')[i].getElementsByTagName('title')[0].innerHTML + "<br>";
    element.appendChild(enunciado);



    var textinp = document.createElement('input');
    textinp.setAttribute('type', "text");
    textinp.setAttribute('id', "text" + i);
    element.appendChild(textinp);
    var label = document.createElement('label');
    label.innerHTML = "<br>";

    element.appendChild(label);

}

function checkquestions() {
    document.getElementById("corr").innerHTML = "<h3>Corrección:</h3><br/>";

    for (var i = 0; i < numquestions; i++) {

        var tipo = xmlDoc.getElementsByTagName('question')[i].getElementsByTagName("type")[0].innerHTML;

        if (tipo === "select") {
            checkRadio(i);
        }
        else if (tipo === "selectMulti") {
            checkCheckbox(i);
        }

        else if (tipo === "text") {
            checkText(i);
        }

        else if (tipo === "check") {
            checkCheckbox(i);
        }

        else if (tipo === "radio") {
            checkRadio(i);
        }
        else {
            alert("Debes rellenar la pregunta nº " + i);
        }
    }
}

function checkRadio(x) {
    var correcta = xmlDoc.getElementById("quest" + x).getElementsByTagName("answer")[0].innerHTML;
    var optionns = document.getElementsByName(x);

    if (optionns[correcta].checked) {
        resultado++;
        document.getElementById("corr").innerHTML = document.getElementById("corr").innerHTML + ("<spam style='color: green;'>" + correctas+ " Correcto" + "<br/></spam>");
        var incorrectas = 0;
        console.log("checkRadio respuesta correcta");
    }
    else {
        incorrectas++;
        document.getElementById("corr").innerHTML = document.getElementById("corr").innerHTML + ("<spam style='color: red;'>" + incorrectas + " Incorrecto" + "<br/></spam>");
    }
}
function checkCheckbox(x) {
    var correctes = xmlDoc.getElementById("quest" + x).getElementsByTagName("answer")[0].innerHTML.split(",");
    var optionns = document.getElementsByName(x);
    var correcta = true;
    for (i = 0; i < correctes.length; i++) {
        correctes[i] = parseInt(correctes[i]);
    }

    for (i = 0; i < optionns.length; i++) {

        if ((correctes.indexOf(i) != -1) && optionns[i].checked == false) {
            correcta = false;
        }
        else if ((correctes.indexOf(i) == -1) && optionns[i].checked == true) {
            correcta = false;
        }
    }
    if (correcta) {
        correctas++;
        document.getElementById("corr").innerHTML = document.getElementById("corr").innerHTML + ("<spam style='color: green;'>" + correctas+ " Correcto" + "<br/></spam>");
        var incorrectas = 0;
        console.log("checkcheckbox en respuesta correcta");
    }
    else {
        incorrectas++;
        document.getElementById("corr").innerHTML = document.getElementById("corr").innerHTML + ("<spam style='color: red;'>" + incorrectas+ " Incorrecto" + "<br/></spam>");
        var incorrectas = 0;
    }
}
function checkText(x) {

    var userAns = document.getElementById("text" + x).value;
    var resp = xmlDoc.getElementsByTagName("question")[x].getElementsByTagName("answer")[0].innerHTML;


    if (resp === userAns) {
        correctas++;
        document.getElementById("corr").innerHTML = document.getElementById("corr").innerHTML + ("<spam style='color: green;'>" + correctas+ " Correcto" + "<br/></spam>");
        var incorrectas = 0;
    }
    else {
        incorrectas++;
        document.getElementById("corr").innerHTML = document.getElementById("corr").innerHTML + ("<spam style='color: red;'>" + incorrectas+ " Incorrecto" + "<br/></spam>");
        var incorrectas = 0;
    }
}
