
window.onload = function(){
    let url = "http://api.openweathermap.org/data/2.5/weather?";
    let minhaAPI = "59affd880268ab22abc1de58b5bb71d8";
    let resultado;
    let cidade;
    let resultadoHTML = "";

    let cidades = document.getElementById('cidade');
    cidades.onchange = function(){
        let ajax = null;

        if(window.XMLHttpRequest){
            ajax = new XMLHttpRequest();
        } else if(window.ActiveXObject){
            ajax = new ActiveXObject("Msxml2.XMLHTTP");
        }
        cidade = cidades.value;
        if(cidade != 0){
            ajax.open("GET", url + 'q=' + cidade + '&appid=' + minhaAPI + '&units=metric&lang=pt', true);
            ajax.send(null);
            ajax.onreadystatechange = function(){
                if(ajax.readyState == 4){
                    if(ajax.status == 200){
                        resultado = JSON.parse(ajax.responseText);
                        resultadoHTML += "<p>Temperatura mínima: "+ resultado.main.temp_min + "&deg;C</p>";
                        resultadoHTML += "<p>Condição: " + resultado.weather[0].description + "</p>";
                        document.getElementById("resultadoClima").innerHTML = resultadoHTML;
                    }
                }
            }
        }
    }
}
