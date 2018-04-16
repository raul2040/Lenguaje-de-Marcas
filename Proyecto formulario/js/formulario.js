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
    var correctas = document.createElement('div');
    correctas.setAttribute('id', "correctas");
    element.appendChild(correctas);
    // Creamos un div y le seteamos un id(correctas) y lo añadimos debajo del boton.
    var incorrectas = document.createElement('div');
    incorrectas.setAttribute('id', 'incorrectas');
    element.appendChild(incorrectas);
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
    enunciado.innerHTML = xmlDoc.getElementsByTagName('question')[i].getElementsByTagName('title')[0].innerHTML + "<br>";
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
    document.getElementById("correctas").innerHTML = "<h3>correctasección:</h3><br/>" + correctas;

    for (var i = 0; i < numquestions; i++) {

        var tipo = xmlDoc.getElementsByTagName('question')[i].getElementsByTagName("type")[0].innerHTML;
        console.log(tipo);
        let x = 1;
        x+=i;
        switch (tipo) {
            case "select":
                checkRadio(x);
                break;
            case "multiple":
                checkCheckbox(x);
                break;
            case "text":
                checkText(x);
                break;
            case "check":
                checkCheckbox(x);
                break;
            case "radio":
                checkRadio(x);
                break;
            default:
                alert("Debes rellenar la pregunta nº " + i);
        }
    }
}

function checkRadio(x) {
    var correctas = xmlDoc.getElementById("quest" + x).getElementsByTagName("answer")[0].innerHTML;
    var options = document.getElementsByName(x);

    if (options[correctas].checked) {
        correctas++;
        document.getElementById("correctas").innerHTML = document.getElementById("correctas").innerHTML + ("<spam style='color: green;'>" + correctas + " correctasecto" + "<br/></spam>");
        console.log("checkRadio respuesta correctasecta");
    }
    else {
        incorrectas++;
        document.getElementById("correctas").innerHTML = document.getElementById("incorrectas").innerHTML + ("<spam style='color: red;'>" + incorrectas + " Incorrectasecto" + "<br/></spam>");
        console.log("checkRadio respuesta incorrectasecta");
    }
}

function checkCheckbox(x) {
    console.log("ha entrado en el CHECKBOX");
    var correctasectes = xmlDoc.getElementById("quest" + x).getElementsByTagName("answer")[0].innerHTML.split(",");
    var optionns = document.getElementsByName(x);
    var correctasecta = true;
    for (i = 0; i < correctasectes.length; i++) {
        correctasectes[i] = parseInt(correctasectes[i]);
    }

    for (i = 0; i < optionns.length; i++) {

        if ((correctasectes.indexOf(i) != -1) && optionns[i].checked == false) {
            correctasecta = false;
        }
        else if ((correctasectes.indexOf(i) == -1) && optionns[i].checked == true) {
            correctasecta = false;
        }
    }

    if (correctasecta) {
        correctas++;
        document.getElementById("correctas").innerHTML = document.getElementById("correctas").innerHTML + ("<spam style='color: green;'>" + correctas + " correctasecto" + "<br/></spam>");
        console.log("checkcheckbox en respuesta correctasecta");
    }
    else {
        incorrectas++;
        document.getElementById("correctas").innerHTML = document.getElementById("incorrectas").innerHTML + ("<spam style='color: red;'>"  + incorrectas + " Incorrectasecto" + "<br/></spam>");
        console.log("checkCheckBox respuesta incorrectasecta");
    }
}

function checkText(x) {

    var userAns = document.getElementById("text" + x).value;
    var resp = xmlDoc.getElementsByTagName("question")[x].getElementsByTagName("answer")[0].innerHTML;

    if (resp == userAns) {
        correctas++;
        document.getElementById("correctas").innerHTML = document.getElementById("correctas").innerHTML + ("<spam style='color: green;'>" + correctas + " correctasecto" + "<br/></spam>");
    }
    else {
        incorrectas++;
        document.getElementById("correctas").innerHTML = document.getElementById("incorrectas").innerHTML + ("<spam style='color: red;'>" + incorrectas + " Incorrectasecto" + "<br/></spam>");
        console.log("checkRadio respuesta incorrectasecta");
    }
}
