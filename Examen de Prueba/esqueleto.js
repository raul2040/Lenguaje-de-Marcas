window.onload=function(){
    var myInf = document.getElementById('inf');

    myInf.onclick = function(){
        var section = document.getElementsByClassName('inf');
        for (i=0;i<section.length;i++){
            if (section[i].style.display =='none'){
                section[i].style.display = 'block';
            }
            else{
                section[i].style.display = 'none';
            }
        }
    }
}


