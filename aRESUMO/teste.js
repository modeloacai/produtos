
const carrinhoCompras = () => {
    let valorAtual = 0;
    const container = document.querySelector('.conteudo');

    const valorGlobalQuantidade = (chaveQuantidade) => {
        valorAtual = parseInt(sessionStorage.getItem(chaveQuantidade));

    }

    const displaySpan = (div, escolhaQuantidade) => {
        let span = document.createElement('span');
        span.setAttribute("class", "displayQuantidade");
        div.appendChild(span);
        span.innerHTML = `${escolhaQuantidade}`
    }

    const botaMaisMenos = (div, chaveQuantidade) => {
        let botaoMais = document.createElement('button');
        let botaoMenos = document.createElement('button');
        botaoMais.setAttribute("class", "botaoMais");
        botaoMenos.setAttribute("class", "botaoMenos");
        botaoMais.innerHTML = "+";
        botaoMenos.innerHTML = "-";
        div.appendChild(botaoMenos);
        div.appendChild(botaoMais);

        // Adiciona evento de clique para o botão de incrementar
        botaoMais.addEventListener('click', function () {
            valorAtual = parseInt(sessionStorage.getItem(chaveQuantidade))
            // Incrementa o valor
            valorAtual++;
            // Atualiza o valor no sessionStorage
            sessionStorage.setItem(chaveQuantidade, valorAtual);
            // Atualiza a interface
            document.querySelector(".displayQuantidade").innerHTML = `${valorAtual}`;
            location.reload();
        });

        // Adiciona evento de clique para o botão de decrementar
        botaoMenos.addEventListener('click', function () {
            valorAtual = parseInt(sessionStorage.getItem(chaveQuantidade))
            // Verifica se o valor atual é maior que zero para evitar valores negativos
            if (valorAtual > 1) {
                // Decrementa o valor
                valorAtual--;
                // Atualiza o valor no sessionStorage
                sessionStorage.setItem(chaveQuantidade, valorAtual);
                // Atualiza a interface
                document.querySelector(".displayQuantidade").innerHTML = ` ${valorAtual}`;
                location.reload();
            }
        });
    }

    const CriaDiv = () => {
        for (let i = 0; i < sessionStorage.length; i++) {

            const chaveQuantidade = `quantidadeProduto_${i}`
            const chaveProduto = `escolhaProduto_${i}`;
            const chaveValor = `escolhaProdutoValor_${i}`;

            const chaveCobertura = `escolhaCobertura_${i}`;
            const chaveFruta = `escolhaFruta_${i}`;
            const chaveComplemento = `escolhaComplemento_${i}`;
            const chaveExtra = `escolhaExtras_${i}`;

            const escolhaQuantidade = sessionStorage.getItem(chaveQuantidade);
            const escolhaProduto = sessionStorage.getItem(chaveProduto);
            const escolhaValor = parseFloat(sessionStorage.getItem(chaveValor));
            const escolhaCobertura = JSON.parse(sessionStorage.getItem(chaveCobertura)) || [];
            const escolhaFrutas = JSON.parse(sessionStorage.getItem(chaveFruta)) || [];
            const escolhaComplementos = JSON.parse(sessionStorage.getItem(chaveComplemento)) || [];
            const escolhaExtras = JSON.parse(sessionStorage.getItem(chaveExtra)) || [];

            valorGlobalQuantidade(chaveQuantidade)
            // valorAtual = parseInt(sessionStorage.getItem(chaveQuantidade))

            if (escolhaProduto && escolhaCobertura && escolhaFrutas && escolhaComplementos && escolhaExtras && !isNaN(escolhaValor)) {
                let div = document.createElement('div');
                div.setAttribute("class", "mercadoria");


                // Construir o texto com os resultados
                div.innerHTML += `
  <span style="font-weight: bold;">&#x27A1 Quantidade:</span> ${valorAtual}<br>
  `;


                container.appendChild(div);
                botaMaisMenos(div, chaveQuantidade);
                displaySpan(div, escolhaQuantidade);


            }
        }
    }
    CriaDiv()
};
document.addEventListener('DOMContentLoaded', carrinhoCompras);
