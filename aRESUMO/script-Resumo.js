
const carrinhoCompras = () => {
  let somaGeral = 0
  const container = document.querySelector('.conteudo');

  const Apagar = (div, chaveProduto, chaveValor, somaTotal) => {
    let excluir = document.createElement('button');
    excluir.setAttribute("class", "excluirItem");
    excluir.innerHTML = "REMOVER &#10060";
    div.appendChild(excluir);


    excluir.addEventListener('click', () => {
      container.removeChild(div); // Remove a div que contém o botão
      removerSessionStorage(chaveProduto, chaveValor);
      //Subtrai o valor junto com a exclusão
      somaGeral -= somaTotal;
      document.querySelector(".valor").innerHTML = `<span style="font-weight: bold;">VALOR GERAL:</span> R$ ${somaGeral.toFixed(2)}`;
    });
  };

  const removerSessionStorage = (chaveProduto, chaveValor) => {
    sessionStorage.removeItem(chaveProduto);
    sessionStorage.removeItem(chaveValor);
  };

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




      if (escolhaProduto && escolhaCobertura && escolhaFrutas && escolhaComplementos && escolhaExtras && !isNaN(escolhaValor)) {
        let div = document.createElement('div');
        div.setAttribute("class", "mercadoria");

        // Exibir ACOMPANHAMENTOS---------------------------------------------------
        function formatarObjetoParaString(objeto) {
          return Array.isArray(objeto) ? formatarEscolhas(objeto) : JSON.stringify(objeto, null, 2);
        }

        function formatarEscolha(escolha) {
          return `${escolha.texto}: ${parseFloat(escolha.valor).toFixed(2)}`;
        }

        function formatarEscolhas(escolhas) {
          return escolhas.map(formatarEscolha).join('<br>');
        }




        // Exiba os valores formatados no HTML
        div.innerHTML += `
 <p>
 <br> <br><span style="font-weight: bold;">PRODUTO:</span> <br>&#127826;${escolhaProduto} - R$ ${escolhaValor.toFixed(2)}
 <br> <br><span style="font-weight: bold;">&#x27A1 QUANTIDADE: </span>${escolhaQuantidade}
 <br>
   <br><span style="font-weight: bold;"> ACOMPANHAMENTOS</span>
   <br><br><span style="font-weight: bold;">&#127860; COBERTURA:</span> <br> ${formatarObjetoParaString(escolhaCobertura)}
   <br><br><span style="font-weight: bold;">&#127860; FRUTAS:</span> <br> ${formatarObjetoParaString(escolhaFrutas)}
   <br><br><span style="font-weight: bold;">&#127860; COMPLEMENTO:</span> <br> ${formatarObjetoParaString(escolhaComplementos)}
   <br><br><span style="font-weight: bold;">&#127860; EXTRAS:</span> <br> ${formatarObjetoParaString(escolhaExtras)} <br></p>
   `;
        // CALCULO ---------------------------------
        const somarArray = (array) => {
          return array.filter((item) => item && typeof item === 'object' && 'valor' in item).reduce((acumulador, item) => acumulador + parseFloat(item.valor), 0);
        };

        // Somar os valores de cada array
        const somaCobertura = somarArray(escolhaCobertura);
        const somaFrutas = somarArray(escolhaFrutas);
        const somaComplementos = somarArray(escolhaComplementos);
        const somaExtras = somarArray(escolhaExtras);

        // Calcular a soma total
        const somaTotal = parseFloat(escolhaValor) * escolhaQuantidade + (somaCobertura + somaFrutas + somaComplementos + somaExtras);

        // Construir o texto com os resultados
        div.innerHTML += `
<p><br><span style="font-weight: bold;">RESUMO TOTAL À PAGAR(R$)</span><br>
<span style="font-weight: bold;">&#128178 Tamanho R$:</span> ${escolhaValor.toFixed(2)} <br>
<span style="font-weight: bold;">&#x27A1 Quantidade:</span> ${escolhaQuantidade}<br>
<span style="font-weight: bold;">&#128178 Cobertura R$:</span> ${somaCobertura.toFixed(2)} <br>
<span style="font-weight: bold;">&#128178 Frutas R$:</span> ${somaFrutas.toFixed(2)} <br>
<span style="font-weight: bold;">&#128178 Complementos R$:</span> ${somaComplementos.toFixed(2)} <br>
<span style="font-weight: bold;">&#128178 Extras R$:</span> ${somaExtras.toFixed(2)} <br><br>
<span style="font-weight: bold;">&#128181 VALOR TOTAL R$:</span> ${somaTotal.toFixed(2)}</p>
`;


        container.appendChild(div);
        Apagar(div, chaveProduto, chaveValor, somaTotal);

        calcular(somaTotal)
      }
    }
  }
  const calcular = (somaTotal) => {
    somaGeral += somaTotal;
  };

  CriaDiv()
  document.querySelector(".valor").innerHTML = `<span style="font-weight: bold;">&#128181 VALOR GERAL:</span> R$ ${somaGeral.toFixed(2)} &#128181`;
}
document.addEventListener('DOMContentLoaded', carrinhoCompras);
