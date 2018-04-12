alert("Las instrucciones son las siguientes: Los campos de seleccionar solo tienen una respuesta correcta, los checkbox pueden tener hasta dos posibles respuestas, los campos de rellenar solo los has de contesar con un si o no, y los campos de selección múltriple tendran varias respuestas correctas, para seleccionar más de una opción tendrás que mantener la tecla crtl para seleccionar varias respuestas");
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