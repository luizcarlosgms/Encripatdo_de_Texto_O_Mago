// Mapas de substituição entre letras e códigos
const cifrasParaCriptografar = {
    "e": "enter",
    "i": "imes",
    "a": "ai",
    "o": "ober",
    "u": "ufat"
};

const cifrasParaDescriptografar = {
    "enter": "e",
    "imes": "i",
    "ai": "a",
    "ober": "o",
    "ufat": "u"
};

// Função para criptografar texto
function criptografaTexto(texto) {
    let textoConvertido = texto;

    for (let letra in cifrasParaCriptografar) {
        const regex = new RegExp(letra, "gi");
        textoConvertido = textoConvertido.replace(regex, (match) =>
            match === match.toUpperCase()
                ? cifrasParaCriptografar[letra].toUpperCase()
                : cifrasParaCriptografar[letra]
        );
    }

    return textoConvertido;
}

// Função para descriptografar texto
function descriptografaTexto(texto) {
    let textoConvertido = texto;

    for (let codigo in cifrasParaDescriptografar) {
        const regex = new RegExp(codigo, "gi");
        textoConvertido = textoConvertido.replace(regex, (match) =>
            match === match.toUpperCase()
                ? cifrasParaDescriptografar[codigo].toUpperCase()
                : cifrasParaDescriptografar[codigo]
        );
    }

    return textoConvertido;
}

// Função para exibir o resultado na tela
function exibirResultado(texto, tipo) {
    const paragrafo = document.querySelector(".texto-criptografado p");
    const containerSemTexto = document.querySelector(".sem-retorno");
    const containerResultado = document.querySelector(".texto-criptografado");

    // Regex que permite letras acentuadas, números, espaços e pontuações básicas
    const caracteresInvalidos = /[^a-zA-ZÀ-ÿ0-9\s.,!?]/;

    containerSemTexto.classList.add("d-none");
    containerResultado.classList.remove("d-none");

    if (caracteresInvalidos.test(texto)) {
        paragrafo.textContent = "Texto contém caracteres inválidos (ex: símbolos especiais).";
    } else {
        const resultado = tipo === 'cripto'
            ? criptografaTexto(texto)
            : descriptografaTexto(texto);

        paragrafo.textContent = resultado;
    }
}

// Inicializa evento de clique no botão "Criptografar"
function iniciarCriptografia() {
    const btn = document.querySelector("#criptografar");
    const campoTexto = document.querySelector("#texto-principal");

    btn.addEventListener("click", (e) => {
        e.preventDefault();
        exibirResultado(campoTexto.value, 'cripto');
    });
}

// Inicializa evento de clique no botão "Descriptografar"
function iniciarDescriptografia() {
    const btn = document.querySelector("#descriptografar");
    const campoTexto = document.querySelector("#texto-principal");

    btn.addEventListener("click", (e) => {
        e.preventDefault();
        exibirResultado(campoTexto.value, 'descripto');
    });
}

// Copiar texto criptografado/descriptografado
function ativarCopia() {
    const btnCopy = document.querySelector("#copiar");
    const textoCopiado = document.querySelector(".texto-criptografado p");

    btnCopy.addEventListener("click", () => {
        navigator.clipboard.writeText(textoCopiado.innerText);
        mostrarAvisoCopia(btnCopy);
    });
}

// Exibe aviso de texto copiado ao lado do botão
function mostrarAvisoCopia(elemento) {
    const aviso = document.createElement("span");
    aviso.textContent = "Texto copiado!";
    aviso.classList.add("aviso-copiado");
    elemento.after(aviso);

    setTimeout(() => aviso.remove(), 2000);
}

// Ajusta altura do textarea automaticamente
function autoResizeTextArea() {
    const textArea = document.querySelector("#texto-principal");
    textArea.addEventListener("input", function () {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });
}

// Inicializa todos os eventos
function init() {
    iniciarCriptografia();
    iniciarDescriptografia();
    ativarCopia();
    autoResizeTextArea();
}

// Inicia ao carregar a página
init();
