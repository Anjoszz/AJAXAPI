// Define uma função para ser executada quando a página é carregada
window.onload = function(){
    // URL base da API do OpenWeatherMap
    let url = "http://api.openweathermap.org/data/2.5/weather?";
    // Chave de API do OpenWeatherMap
    let minhaAPI = "59affd880268ab22abc1de58b5bb71d8";
    // Variável para armazenar os dados da resposta da API
    let resultado;
    // Variável para armazenar o valor selecionado pelo usuário no elemento de seleção de cidade
    let cidade;
    // Variável para armazenar o HTML que será inserido na página para exibir os resultados
    let resultadoHTML = "";

    // Obtém o elemento de seleção de cidade do HTML
    let cidades = document.getElementById('cidade');
    // Define uma função para ser executada quando o valor do elemento de seleção de cidade for alterado
    cidades.onchange = function(){
        // Inicializa uma variável para a requisição AJAX
        let ajax = null;

        // Verifica se o navegador suporta XMLHttpRequest e cria um objeto XMLHttpRequest adequado
        if(window.XMLHttpRequest){
            ajax = new XMLHttpRequest();
        } else if(window.ActiveXObject){
            ajax = new ActiveXObject("Msxml2.XMLHTTP");
        }

        // Obtém o valor selecionado pelo usuário no elemento de seleção de cidade
        cidade = cidades.value;
        // Verifica se uma cidade foi selecionada
        if(cidade != 0){
            // Abre uma conexão com o servidor da API, especificando a URL, a cidade selecionada, sua chave de API, unidades de medida (métrico) e idioma (português)
            ajax.open("GET", url + 'q=' + cidade + '&appid=' + minhaAPI + '&units=metric&lang=pt', true);
            // Envia a solicitação para o servidor
            ajax.send(null);
            // Define uma função para ser chamada sempre que o estado da solicitação AJAX mudar
            ajax.onreadystatechange = function(){
                // Verifica se a solicitação foi concluída
                if(ajax.readyState == 4){
                    // Verifica se a resposta foi bem-sucedida
                    if(ajax.status == 200){
                        // Converte a resposta JSON em um objeto JavaScript
                        resultado = JSON.parse(ajax.responseText);
                        // Adiciona à variável resultadoHTML um parágrafo com a temperatura mínima da cidade
                        resultadoHTML += "<p>Temperatura mínima: "+ resultado.main.temp_min + "&deg;C</p>";
                        // Adiciona à variável resultadoHTML um parágrafo com a descrição da condição climática da cidade
                        resultadoHTML += "<p>Condição: " + resultado.weather[0].description + "</p>";
                        // Insere o HTML gerado na página, dentro do elemento com o ID resultadoClima
                        document.getElementById("resultadoClima").innerHTML = resultadoHTML;
                    }
                }
            }
        }
    }
}
