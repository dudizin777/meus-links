let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
let historico = JSON.parse(localStorage.getItem("historico")) || [];

// cada item do pedido fica aqui
let pedido = [];

renderizarProdutos();
atualizarTudo();

/* =========================
   MODAL
========================= */

function abrirModal(){
    document.getElementById("modal").style.display = "block";
}

function fecharModal(){
    document.getElementById("modal").style.display = "none";
}

/* =========================
   PRODUTOS
========================= */

function adicionarProduto(){

    const nome = document.getElementById("nomeProduto").value.trim();
    const preco = parseFloat(document.getElementById("precoProduto").value);

    if(!nome || isNaN(preco)){
        alert("Preencha tudo");
        return;
    }

    produtos.push({
        nome,
        preco
    });

    localStorage.setItem("produtos", JSON.stringify(produtos));

    document.getElementById("nomeProduto").value = "";
    document.getElementById("precoProduto").value = "";

    fecharModal();
    renderizarProdutos();
}

/* =========================
   RENDER PRODUTOS (+ / -)
========================= */

function renderizarProdutos(){

    const div = document.getElementById("listaProdutos");
    div.innerHTML = "";

    produtos.forEach((p, i)=>{

        // cria quantidade padrão se não existir
        if(p.qtd === undefined) p.qtd = 0;

        div.innerHTML += `
            <div class="produto">

                <strong>${p.nome}</strong><br>
                R$ ${p.preco.toFixed(2)}

                <div class="controle">

                    <button onclick="diminuir(${i})">-</button>

                    <div class="quantidade" id="qtd-${i}">
                        ${p.qtd}
                    </div>

                    <button onclick="aumentar(${i})">+</button>

                </div>

            </div>
        `;
    });

    atualizarTotal();
}

/* =========================
   CONTROLE + / -
========================= */

function aumentar(i){

    produtos[i].qtd = (produtos[i].qtd || 0) + 1;

    salvarProdutos();
    renderizarProdutos();
}

function diminuir(i){

    if(!produtos[i].qtd) produtos[i].qtd = 0;

    if(produtos[i].qtd > 0){
        produtos[i].qtd -= 1;
    }

    salvarProdutos();
    renderizarProdutos();
}

function salvarProdutos(){
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

/* =========================
   TOTAL
========================= */

function atualizarTotal(){

    let total = 0;

    produtos.forEach(p=>{
        total += (p.qtd || 0) * p.preco;
    });

    document.getElementById("totalPedido").innerText =
    `Total: R$ ${total.toFixed(2)}`;
}

/* =========================
   FINALIZAR VENDA
========================= */

function finalizarVenda(){

    let total = 0;

    produtos.forEach(p=>{
        total += (p.qtd || 0) * p.preco;
    });

    if(total === 0){
        alert("Pedido vazio");
        return;
    }

    historico.push({
        data: new Date().toLocaleString(),
        total
    });

    localStorage.setItem("historico", JSON.stringify(historico));

    // ZERAR PRODUTOS (RESET +0-)
    produtos = produtos.map(p=>({
        ...p,
        qtd: 0
    }));

    salvarProdutos();

    atualizarTudo();
}

/* =========================
   HISTÓRICO
========================= */

function renderizarHistorico(){

    const div = document.getElementById("historico");
    div.innerHTML = "";

    historico.slice().reverse().forEach((h, i)=>{

        div.innerHTML += `
            <div class="produto">
                Venda #${historico.length - i}
                <br>
                ${h.data}
                <br>
                <strong>R$ ${h.total.toFixed(2)}</strong>
            </div>
        `;
    });
}

/* =========================
   ESTATÍSTICAS
========================= */

function atualizarEstatisticas(){

    let faturamento = 0;

    historico.forEach(h=>{
        faturamento += h.total;
    });

    document.getElementById("faturamento").innerText =
    `Faturamento: R$ ${faturamento.toFixed(2)}`;

    document.getElementById("vendas").innerText =
    `Vendas: ${historico.length}`;
}

/* =========================
   LIMPAR HISTÓRICO
========================= */

function limparHistorico(){

    if(!confirm("Limpar histórico?")) return;

    historico = [];
    localStorage.removeItem("historico");

    atualizarTudo();
}

/* =========================
   UPDATE GERAL
========================= */

function atualizarTudo(){
    renderizarProdutos();
    renderizarHistorico();
    atualizarEstatisticas();
    atualizarTotal();
}