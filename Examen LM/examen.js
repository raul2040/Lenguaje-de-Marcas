window.onload = ejecuta();
function ejecuta(){
    var contador = document.getElementsByTagName("p");
    for(var x=0; x < contador.length;x++){
    }
    
    var resta = x - 1;
    var suma = resta + 1;
    document.getElementById("demo").innerHTML = "En esta página habían " + resta + " párrafos y ahora hay "+ suma +" párrafos, siendo " + suma + " el número de párrafos totales";
}

