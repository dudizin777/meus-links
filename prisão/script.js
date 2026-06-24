const presosAtuais = document.getElementById("presosAtuais");
const historicoDiv = document.getElementById("historico");

let presos = [];

carregarHistorico();

function adicionarPreso() {

    const nomeInput = document.getElementById("nome");
    const nome = nomeInput.value.trim();

    if (!nome) {
        alert("Digite um nome.");
        return;
    }

    const preso = {
        id: Date.now(),
        nome: nome,
        inicio: Date.now(),
        duracao: 3 * 60 // 3 minutos mude o tempo aqui
    };

    presos.push(preso);

    nomeInput.value = "";

    renderizarPresos();
}

function renderizarPresos() {

    presosAtuais.innerHTML = "";

    presos.forEach(preso => {

        const card = document.createElement("div");
        card.className = "card";

        const restante =
            preso.duracao -
            Math.floor((Date.now() - preso.inicio) / 1000);

        if (restante <= 0) {

            card.classList.add("liberar");

            card.innerHTML = `
                <h3>${preso.nome}</h3>
                <p>Tempo encerrado!</p>
                <button class="okBtn" onclick="liberarPreso(${preso.id})">
                    OK
                </button>
            `;

        } else {

            const minutos = Math.floor(restante / 60);
            const segundos = restante % 60;

            card.innerHTML = `
                <h3>${preso.nome}</h3>
                <div class="tempo">
                    ${String(minutos).padStart(2,'0')}:
                    ${String(segundos).padStart(2,'0')}
                </div>
            `;
        }

        presosAtuais.appendChild(card);
    });
}

function liberarPreso(id) {

    const preso = presos.find(p => p.id === id);

    if (!preso) return;

    const historico =
        JSON.parse(localStorage.getItem("historicoPresos")) || [];

    historico.push({
        nome: preso.nome,
        horarioPrisao: new Date(preso.inicio).toLocaleString()
    });

    localStorage.setItem(
        "historicoPresos",
        JSON.stringify(historico)
    );

    presos = presos.filter(p => p.id !== id);

    renderizarPresos();
    carregarHistorico();
}

function carregarHistorico() {

    const historico =
        JSON.parse(localStorage.getItem("historicoPresos")) || [];

    if (historico.length === 0) {
        historicoDiv.innerHTML = "Nenhum registro.";
        return;
    }

    historicoDiv.innerHTML = historico
        .map(item => `
            <p>
                <strong>${item.nome}</strong>
                - Preso em: ${item.horarioPrisao}
            </p>
        `)
        .join("");
}

setInterval(renderizarPresos, 1000);