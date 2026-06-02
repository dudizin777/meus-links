const btn = document.getElementById("btn");
const mensagem = document.getElementById("mensagem");

btn.addEventListener("click", () => {
    mensagem.classList.toggle("show");
});

function criarCoracao() {

    const heart = document.createElement("div");

    heart.classList.add("heart");
    heart.innerHTML = "❤️";

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.fontSize =
        Math.random() * 20 + 15 + "px";

    heart.style.animationDuration =
        Math.random() * 3 + 4 + "s";

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 7000);
}

setInterval(criarCoracao, 300);