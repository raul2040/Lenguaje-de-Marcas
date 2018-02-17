function changeBD(x){
    var element = document.getElementsByClassName(x);

    for (var i = 0; i < element.length; i++){
        element[i].style.color = "white";
        element[i].style.backgroundColor = "green";
    }
}
function defaultBD(x){
    var element = document.getElementsByClassName(x);
    document.getElementById("BD").style.display = "none";

    for (var i = 0; i < element.length; i++){
        element[i].style.color = "black";
        element[i].style.backgroundColor = "orange";
    }
}
function infoBD(id){
            id.innerHTML = "Asignatura de Base de Datos, impartida por Jaume.";
}


function changeLM(x){
    var element = document.getElementsByClassName(x);

    for (var i = 0; i < element.length; i++){
        element[i].style.color = "white";
        element[i].style.backgroundColor = "green";
    }
}
function defaultLM(x){
    var element = document.getElementsByClassName(x);
    document.getElementById("LM").style.display = "none";

    for (var i = 0; i < element.length; i++){
        element[i].style.color = "black";
        element[i].style.backgroundColor = "orange";
    }
}
function infoLM(id){
    id.innerHTML = "asignatura de Lenguaje de Marcas, impartida por Rafa";
}

function changePR(x){
    var element = document.getElementsByClassName(x);

    for (var i = 0; i < element.length; i++){
        element[i].style.color = "white";
        element[i].style.backgroundColor = "green";
    }
}
function defaultPR(x){
    var element = document.getElementsByClassName(x);
    document.getElementById("PR").style.display = "none";

    for (var i = 0; i < element.length; i++){
        element[i].style.color = "black";
        element[i].style.backgroundColor = "orange";
    }
}
function infoPR(id){
    id.innerHTML = "Asignatura de programación, impartida por David Gelpi";
}

function changeED(x){
    var element = document.getElementsByClassName(x);

    for (var i = 0; i < element.length; i++){
        element[i].style.color = "white";
        element[i].style.backgroundColor = "green";
    }
}
function defaultED(x){
    var element = document.getElementsByClassName(x);
    document.getElementById("ED").style.display = "none";

    for (var i = 0; i < element.length; i++){
        element[i].style.color = "black";
        element[i].style.backgroundColor = "orange";
    }
}
function infoED(id){
    id.innerHTML = "Asignatura de programación, impartida por David Gelpi";
}


function changeFOL(x){
    var element = document.getElementsByClassName(x);

    for (var i = 0; i < element.length; i++){
        element[i].style.color = "white";
        element[i].style.backgroundColor = "green";
    }
}
function defaultFOL(x){
    var element = document.getElementsByClassName(x);
    document.getElementById("FOL").style.display = "none";

    for (var i = 0; i < element.length; i++){
        element[i].style.color = "black";
        element[i].style.backgroundColor = "orange";
    }
}
function infoFOL(id){
    id.innerHTML = "Asignatura de Formación, Orientación, Laboral, para el día de mañana";
}

function changeSI(x){
    var element = document.getElementsByClassName(x);

    for (var i = 0; i < element.length; i++){
        element[i].style.color = "white";
        element[i].style.backgroundColor = "green";
    }
}
function defaultSI(x){
    var element = document.getElementsByClassName(x);
    document.getElementById("SI").style.display = "none";

    for (var i = 0; i < element.length; i++){
        element[i].style.color = "black";
        element[i].style.backgroundColor = "orange";
    }
}
function infoSI(id){
    id.innerHTML = "Asignatura de Sistemas Informáticos, donde veremos sistemas y componentes informáticos";
}

