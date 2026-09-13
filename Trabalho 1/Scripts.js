/* \\\\Footer\\\\ */

const currentYear = document.getElementById("current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

/* \\\\Pagina de cadastro\\\\ */

function verificar(event) {

    event.preventDefault();

    const nome = document.getElementById("name").value.trim();
    const login = document.getElementById("login").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const cpf = document.getElementById("cpf").value.trim();
    const data = document.getElementById("date").value;
    const email = document.getElementById("email").value.trim();

    const erroDiv = document.getElementById("mensagem-erro");
    const divs = document.querySelectorAll(".login-cadastro #campo");

    // lista dos campos que estão vazios
    let camposVazios = [];

    if(nome === ""){
        camposVazios.push("Nome");
    }

    if(login === ""){
        camposVazios.push("Login");
    }

    if(senha === ""){
        camposVazios.push("Senha");
    }

    if(cpf === ""){
        camposVazios.push("CPF");
    }

    if(data === ""){
        camposVazios.push("Data de nascimento");
    }

    if(email === ""){
        camposVazios.push("E-mail");
    }

    // verifica se existe algum campo vazio
    if(camposVazios.length > 0){

        let mensagem;

        if(camposVazios.length === 1){

            mensagem = `Erro: O campo ${camposVazios[0]} é obrigatório!`;

        }else{

            mensagem = `Erro: Os campos ${camposVazios.join(", ")} são obrigatórios!`;

        }

        erroDiv.innerHTML = `<p>${mensagem}</p>`;
        erroDiv.style.display = "block";

        divs.forEach(div => {
            div.style.paddingLeft = "100px";
        });

        return;
    }

    // pega os usuarios cadastrados
    let usuarios = JSON.parse(localStorage.getItem("cadastroUsuarios")) || [];

    // verifica se o login ja existe
    const loginExiste = usuarios.find(function(usuario){
        return usuario.login === login;
    });

    if (loginExiste){
        erroDiv.innerHTML = "<p>Erro: Este login já está cadastrado!</p>";
        erroDiv.style.display = "block";

        return;
    }

    // verifica se o cpf ja existe
    const cpfExiste = usuarios.find(function(usuario) {
        return usuario.cpf === cpf;
    });

    if (cpfExiste){
        erroDiv.innerHTML = "<p>Erro: Este CPF já está cadastrado!</p>";
        erroDiv.style.display = "block";

        return;
    }

    // cria o objeto do usuario
    const dadosUsuario = {
        nome: nome,
        login: login,
        senhaUsuario: senha,
        cpf: cpf,
        dataNascimento: data,
        email: email
    };

    // adiciona o novo usuario
    usuarios.push(dadosUsuario);

    // salva todos os usuarios
    localStorage.setItem("cadastroUsuarios",JSON.stringify(usuarios));

    alert("Cadastro realizado com sucesso!");

    // vai pro login
    window.location.href = "login.html";
}

/* \\\\pagina de login\\\\ */

const formLogin = document.getElementById("form-login");

if (formLogin){

    formLogin.addEventListener("submit", function(event){

        event.preventDefault();

        const login = document.getElementById("login").value.trim();
        const senha = document.getElementById("senha").value.trim();
        const erroDiv = document.getElementById("mensagem-erro");
        const divs = document.querySelectorAll(".login-cadastro #campo");

        // verifica campos vazios
        if (login === "" || senha === ""){

            erroDiv.innerHTML = "<p>Erro: Todos os campos são obrigatórios!</p>";
            erroDiv.style.display = "block";

            divs.forEach(div => {
                div.style.paddingLeft = "100px";
            });

            return;
        }

        // procura os usuarios
        const textoSalvo = localStorage.getItem("cadastroUsuarios");

        // nenhum usuario cadastrado
        if (textoSalvo === null){

            erroDiv.innerHTML = "<p>Erro: Nenhum usuário cadastrado neste navegador!</p>";
            erroDiv.style.display = "block";

            divs.forEach(div => {
                div.style.paddingLeft = "100px";
            });

            return;
        }

        // converte para array
        const usuarios = JSON.parse(textoSalvo);

        // procura usuario com login e senha
        const usuario = usuarios.find(function(usuario){
                return (
                    usuario.login === login && usuario.senhaUsuario === senha
                );
            });

        // login correto
        if (usuario){

            erroDiv.style.display = "none";

            // guarda o usuario que ta logado
            localStorage.setItem(
                "usuarioLogado", JSON.stringify(usuario));

            alert("Login realizado com sucesso!");

            window.location.href = "index.html";

        }

        // login incorreto
        else{
            erroDiv.innerHTML = "<p>Erro: Login ou senha incorretos!</p>";
            erroDiv.style.display = "block";

            divs.forEach(div => {
                div.style.paddingLeft = "50px";
            });
        }
    });

}


/* \\\\Livros\\\\ */

function mudar_preco(){

    const campoQnt = document.getElementById("qnt");
    const precoVistaElemento = document.getElementById("preco_vista");
    const totalPrecoElemento = document.getElementById("total_preco");

    // se n tiver na p\gina do produto, n faz nada
    if( !campoQnt || !precoVistaElemento || !totalPrecoElemento
    ){
        return;
    }

    // pega a quantidade
    const qnt = Number(campoQnt.value);

    // pega o texto do preço
    const texto = precoVistaElemento.textContent;

    // converte o preço para numero
    const precoVista =
        Number(
            texto
                .replace("Preço à vista: R$", "")
                .replace(",", ".")
                .trim()
        );

    // calcula o total
    const total = precoVista * qnt;

    // mostra o resultado
    totalPrecoElemento.textContent = `Preço total: R$ ${total.toFixed(2).replace(".", ",")}`;
}

// evento da quantidade
const campoQnt = document.getElementById("qnt");

if(campoQnt){
    campoQnt.addEventListener("input", mudar_preco);
}




function add_carrinho(){

    const campoQnt = document.getElementById("qnt");
    const precoVista = document.getElementById("preco_vista");
    const totalPreco = document.getElementById("total_preco");
    const nomeProduto = document.getElementById("produto_nome_detalhes");
    const imagemProduto = document.getElementById("imagem_produto");

    const qnt = Number(campoQnt.value);
    const precoUn = Number(
        precoVista.textContent
            .replace("Preço à vista: R$", "")
            .replace(",", ".")
            .trim()
    );

    const precoTotal = precoUn * qnt;

    totalPreco.textContent = `Preço total: R$ ${precoTotal.toFixed(2).replace(".", ",")}`;

    const nome = nomeProduto.textContent.trim();
    const imagem = imagemProduto.getAttribute("src");
    const dadosProduto = {
        nome: nome,
        imagem: imagem,
        qnt: qnt,
        precoUn: precoUn,
        precoTotal: precoTotal
    };

    //pega os produtos
    let produtos = JSON.parse(localStorage.getItem("dadosProdutos")) || [];

    var produtoEncontrado = false;
    //laço para ver se o produto ja ta no carrinho
    for (let i = 0; i < produtos.length; i++) {
        // se ele já tiver só aumenta a quant
        if (produtos[i].nome === nome) {

            produtoEncontrado = true;
            produtos[i].qnt += qnt;
            produtos[i].precoTotal=produtos[i].precoUn*produtos[i].qnt;

            break;
        }
    }
        //se nao tiver, vai adicionar o produto
        if (produtoEncontrado == false){
            produtos.push(dadosProduto);
        };

   

    localStorage.setItem("dadosProdutos", JSON.stringify(produtos));

    alert("Produto adicionado ao carrinho!");
}

/* \\\\Carrinho\\\\ */

let descontoAplicado = false;
let freteGratis = false;

function calcularTotalCarrinho() {

    const subtotalElemento = document.getElementById("subtotal");
    const freteElemento = document.getElementById("valor_frete");
    const totalElemento = document.getElementById("totalTotal");
    const campoCep = document.getElementById("cep");

    // Se não estiver na página do carrinho
    if (!subtotalElemento || !freteElemento || !totalElemento ||!campoCep
    ) {
        return;
    }

    // Pega os produtos
    const produtos = JSON.parse(
        localStorage.getItem("dadosProdutos")
    ) || [];

    // Calcula o subtotal de todos os produtos
    let subtotal = 0;

    produtos.forEach(function(produto) {

        subtotal = subtotal + Number(produto.precoTotal);

    });


    const cep = campoCep.value.replace(/\D/g, ""); // essas coisinhas é pra transformar o cep em apenas numero pra caso ele seja escritp com tracinho, o \d é pra qualquer elemento e o g quer dizer global que vai percorrer a palavra toda e nao vai parar na primeira ocorrencia

    let frete = 0;

    //define os valores
    if (cep === "88495000") {

        frete = 5;

    } else if (cep === "88780000") {

        frete = 8;

    } else if (cep === "88490000") {

        frete = 10;

    }


    let desconto = 0;

    if (descontoAplicado) {

        desconto = subtotal * 0.10;

    }


    // frete grátis
    if (freteGratis) {

        frete = 0;

    }


    // calcula o total
    const total = subtotal + frete - desconto;
    


    // Mostra subtotal
    subtotalElemento.textContent = `R$ ${subtotal.toFixed(2).replace(".", ",")}`;


    // Mostra frete
    freteElemento.textContent =`R$ ${frete.toFixed(2).replace(".", ",")}`;

    // Mostra desconto
    const descontoElemento = document.getElementById("desconto");

    if (descontoElemento) {

        descontoElemento.textContent = `- R$ ${desconto.toFixed(2).replace(".", ",")}`;

    }


    // Mostra total
    totalElemento.textContent = `R$ ${total.toFixed(2).replace(".", ",")}`;
}

    const campoCep = document.getElementById("cep");

    if (campoCep) {

        campoCep.addEventListener("input", function() {
            calcularTotalCarrinho();
        });

    }

function mostrarCarrinho() {

    const listaCarrinho = document.getElementById("lista_carrinho");

    // Se não estiver na página do carrinho
    if (!listaCarrinho) {
        return;
    }

    // Pega os produtos salvos
    const produtos = JSON.parse(localStorage.getItem("dadosProdutos")    ) || [];

    // se o carrinho ta vazio
    if (produtos.length === 0) {

        listaCarrinho.innerHTML = `
             <p class="carrinho-vazio">Seu carrinho está vazio.</p>
        `;

        return;
    }

    // Limpa o carrinho
    listaCarrinho.innerHTML = "";

    // Cria cada produto
    produtos.forEach(function(produto, index) {

        const item = document.createElement("div");

        item.className = "item";

        item.innerHTML = `

            <img
                class="foto"
                src="${produto.imagem}"
                alt="${produto.nome}"
            >

            <ul>

                <li class="produto_nome_carrinho">
                    ${produto.nome}
                </li>

                <li class="produto_qnt">

                    <label for="qtd${index}">
                        Quantidade:
                    </label>

                    <input
                        type="number"
                        id="qtd${index}"
                        value="${produto.qnt}"
                        min="1"
                    >

                </li>

                <li>
                    Preço unitário:
                    R$ ${produto.precoUn.toFixed(2).replace(".", ",")}
                </li>

                <div class="total-container">

                    <span>
                        Preço total:
                    </span>

                    <span id="total${index}">
                        R$ ${produto.precoTotal.toFixed(2).replace(".", ",")}
                    </span>

                </div>

            </ul>
        `;

        listaCarrinho.appendChild(item);


        // Campo de quantidade
        const campoQuantidade = document.getElementById(`qtd${index}`);

        // Campo do preço total
        const campoTotal =document.getElementById(`total${index}`);


        // Quando mudar a quantidade
        campoQuantidade.addEventListener("input", function() {

            let novaQuantidade = Number(campoQuantidade.value);

            // isso aqui nao permite quantidade menor que 1
            if (novaQuantidade < 1 || isNaN(novaQuantidade)) {
                novaQuantidade = 1;
                campoQuantidade.value = 1;
            }

            // Calcula o novo total
            const novoTotal =produto.precoUn * novaQuantidade;

            // Mostra o novo total
            campoTotal.textContent =`R$ ${novoTotal.toFixed(2).replace(".", ",")}`;

            // Atualiza o produto
            produto.qnt = novaQuantidade;
            produto.precoTotal = novoTotal;

            // Salva no localStorage
            localStorage.setItem(
                "dadosProdutos",
                JSON.stringify(produtos)
            );

            calcularTotalCarrinho();
        });
        
    });
}
mostrarCarrinho()
calcularTotalCarrinho();


function limparCarrinho() {

    // Apaga os produtos do carrinho
    localStorage.removeItem("dadosProdutos");

    // Atualiza a lista na tela
    const listaCarrinho = document.getElementById("lista_carrinho");

    if (listaCarrinho) {
        listaCarrinho.innerHTML = `
            <p>Seu carrinho está vazio.</p>
        `;
    }
}


    const botaoLimpar = document.getElementById("LimparCarrinho");

    if (botaoLimpar) {

        botaoLimpar.addEventListener("click", function() {

            // Apaga os produtos salvos no carrinho
            localStorage.removeItem("dadosProdutos");

            // Pega a área do carrinho
            const listaCarrinho = document.getElementById("lista_carrinho");

            // Mostra carrinho vazio
            if (listaCarrinho) {
                listaCarrinho.innerHTML = `
                    <p class="carrinho-vazio">Seu carrinho está vazio.</p>
                `;
            }
            calcularTotalCarrinho();


        });

    }
    


function aplicarCupom() {

    const campoCupom = document.getElementById("cupom");
    const mensagemCupom = document.getElementById("mensagem-cupom");

    if (!campoCupom || !mensagemCupom) {
        return;
    }

    //transforma em letra maiuscula
    const cupom = campoCupom.value.trim().toUpperCase();

    if (cupom === "DESCONTO10") {

        descontoAplicado = true;

        mensagemCupom.textContent = "Cupom de 10% aplicado!";

        mensagemCupom.style.color = "green";

    } else if (cupom === "FRETEGRATIS") {

        freteGratis = true;

        mensagemCupom.textContent ="Cupom de frete grátis aplicado!";
        mensagemCupom.style.color = "green";

    } else {

        mensagemCupom.textContent = "Cupom inválido.";
        mensagemCupom.style.color = "red";
    }

    campoCupom.value = "";

    calcularTotalCarrinho();
}

    const botaoCupom = document.getElementById("aplicarCupom");

    if (botaoCupom) {
        botaoCupom.addEventListener("click", function() {
            aplicarCupom();
        });
    }


    //nossos produtos
    const produtos = [
        { nome: "Orgulho e Preconceito", pagina: "livro1.html" },
        { nome: "O Pequeno Príncipe", pagina: "livro2.html" },
        { nome: "1984", pagina: "livro3.html" },
        { nome: "Cem Anos de Solidão", pagina: "livro4.html" },
        { nome: "A Metamorfose", pagina: "livro5.html" },
        { nome: "Frankenstein", pagina: "livro6.html" },
        { nome: "Dom Casmurro", pagina: "livro7.html" },
        { nome: "Dom Quixote", pagina: "livro8.html" }
    ];

    const campoBusca = document.getElementById("busca");
    const sugestoes = document.getElementById("sugestoes");

    if (campoBusca && sugestoes) {

        campoBusca.addEventListener("input", function() {

            //pega o texto digitado, transforma tudo em letras minusculas e remove espaços desnecessarios
            const texto = campoBusca.value.toLowerCase().trim();

            sugestoes.innerHTML = "";

            if (texto === "") {
                return;
            }

           //procura nos produtos algo que corresponde ao que foi digitado
            const resultados = produtos.filter(function(produto) {

                //divide o que o usuário digitou em palavras
                const palavrasDigitadas = texto.split(" ");

                const palavrasProduto = produto.nome.toLowerCase().split(" ");

                // verifica se todas as palavras digitadas correspondem ao começo de alguma palavra do produto
                return palavrasDigitadas.every(function(palavraDigitada) {

                    return palavrasProduto.some(function(palavraProduto) {

                        //Verifica se a palavra do produto começa com o que foi digitado
                        return palavraProduto.startsWith(palavraDigitada);

                    });

                });

            });

            // cria uma sugestão p cada produto encontrado
            resultados.forEach(function(produto) {

                // cria uma div p mostrar a sugestão
                const sugestao = document.createElement("div");

                //coloca o nome do livro dentro da sugestao
                sugestao.textContent = produto.nome;

                // adiciona a classe css da sugestão
                sugestao.classList.add("sugestao");

                //// quando o clicar na sugestão, vai para a pag daquele livro
                sugestao.addEventListener("click", function() {

                    window.location.href = produto.pagina;

                });

                // adiciona a sugestão na area de sugestoes
                sugestoes.appendChild(sugestao);

            });

        });

    }