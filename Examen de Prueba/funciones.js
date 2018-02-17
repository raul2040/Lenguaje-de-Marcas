function ejecuta(){
	document.getElementsById("nombre del id").onclick = saludo; -> evento onclick. Saludo funcion a la que hare referencia
}
function saluda(){
	alert("Qué hay de nuevo?");
}
window.onload=ejecuta;
Otra forma de hacerlo seria de la siguiente forma:

function ejecuta(){
	for( var i=o; i < 3; i++){
		document.getElementsByTagName("p")[i].onclick = saludo;
	}
}
function saludo(){
		alert("Qué hay de nuevo?");
}
window.onload=ejecuta;

Y una forma mas:

unction ejecuta(){
	for( var i=o; i < 3; i++){
		document.getElementsByClassName("nombre de la clase")[i].onclick = saludo;
	}
}
function saludo(){
		alert("Qué hay de nuevo?");
}
window.onload=ejecuta;

Algunos ejemplos de como desplegar un menu y ocultarlo simplemente haciendo un click se puede hacer de la siguiente forma:

window.onload = function () {
	var myInf = document.getElementById('inf');

	myInf.onclick = function () {
	var section = document.getElementsByClassName('inf');
	for (i = 0; i < section.length; i++) {
		if (section[i].style.display == 'none') {
			section[i].style.display = 'block';
		} else {
			section[i].style.display = 'none';
		}
	}
}
}

function ocultarArticulo() {
	var documento = document.getElementById('art1');
	if (documento.style.display == "block") {
		documento.style.display = "none";
	} else {
		documento.style.display = "block";
	}
}

function ocultarArticulo2() {
	var documento = document.getElementById('art2');
	if (documento.style.display == "block") {
	documento.style.display = "none";
	} else {
	documento.style.display = "block";
	}
}
