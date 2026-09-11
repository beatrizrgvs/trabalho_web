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

    // verifica se algum campo ta vazio
    if(nome === "" || login === "" || senha === "" || cpf === "" || data === "" || email === ""){

        erroDiv.innerHTML = "<p>Erro: Todos os campos são obrigatórios!</p>";
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


    // adiciona o novo usuário
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

            // guarda o usuario que está logado
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

    // Se n tiver na p\gina do produto, n faz nada
    if( !campoQnt || !precoVistaElemento || !totalPrecoElemento
    ){
        return;
    }

    // pega a quantidade
    const qnt = Number(campoQnt.value);

    // pega o texto do preço
    const texto = precoVistaElemento.textContent;

    // converte o preço para número
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

/* \\\\Carrinho\\\\ */

// preços dos produtos
const v1 = 42.99;
const v2 = 19.90;
const v3 = 54.02;
const v4 = 69.90;


// valores dos fretes
const frete1 = 5;
const frete2 = 8;
const frete3 = 10;

function totalizar() {

    const qtd1 = document.getElementById("qtd1");
    const qtd2 = document.getElementById("qtd2");
    const qtd3 = document.getElementById("qtd3");
    const qtd4 = document.getElementById("qtd4");

    // Se n tiver na pagina do carrinho
    if(!qtd1 || !qtd2 || !qtd3 || !qtd4){
        return;
    }

    // calcula os preços
    const p1 = Number(qtd1.value) * v1;

    const p2 = Number(qtd2.value) * v2;

    const p3 = Number(qtd3.value) * v3;

    const p4 = Number(qtd4.value) * v4;

    // mostra os totais
    const total1 = document.getElementById("total1");
    const total2 = document.getElementById("total2");
    const total3 = document.getElementById("total3");
    const total4 = document.getElementById("total4");

    if(total1){
        total1.textContent = "Preço total: R$ " + p1.toFixed(2).replace(".", ",");
    }

    if(total2){
        total2.textContent = "Preço total: R$ " + p2.toFixed(2).replace(".", ",");
    }

    if(total3){
        total3.textContent = "Preço total: R$ " + p3.toFixed(2).replace(".", ",");
    }

    if(total4){
        total4.textContent = "Preço total: R$ " + p4.toFixed(2).replace(".", ",");
    }

    return {p1, p2, p3, p4};
}

const qtd1 = document.getElementById("qtd1");

const qtd2 = document.getElementById("qtd2");

const qtd3 = document.getElementById("qtd3");

const qtd4 = document.getElementById("qtd4");

if(qtd1){
    qtd1.addEventListener( "input", totalizar);
}

if(qtd2){
    qtd2.addEventListener( "input", totalizar);
}

if(qtd3){
    qtd3.addEventListener( "input", totalizar);
}

if(qtd4){
    qtd4.addEventListener( "input", totalizar);
}

function calcularfrete() {

    const cep1 = document.getElementById("cep1");
    const cep2 = document.getElementById("cep2");
    const cep3 = document.getElementById("cep3");
    const elementoFrete1 = document.getElementById("f1");
    const elementoFrete2 = document.getElementById("f2");
    const elementoFrete3 = document.getElementById("f3");

    // se n tiver no carrinho
    if( !cep1 || !cep2 || !cep3 || !elementoFrete1 || !elementoFrete2 || !elementoFrete3
    ){
        return;
    }

    let valorFrete1 = 0;
    let valorFrete2 = 0;
    let valorFrete3 = 0;

    // CEP 1
    if(cep1.value === "88495000"){

        valorFrete1 = frete1;

    }else if(cep1.value === "88780000"){

        valorFrete1 = frete2;

    }else if(cep1.value === "88490000"){

        valorFrete1 = frete3;

    }

    // CEP 2
    if(cep2.value === "88495000"){

        valorFrete2 = frete1;

    }else if(cep2.value === "88780000"){

        valorFrete2 = frete2;

    }else if(cep2.value === "88490000"){

        valorFrete2 = frete3;

    }

    // CEP 3
    if(cep3.value === "88495000"){

        valorFrete3 = frete1;

    }else if(cep3.value === "88780000"){

        valorFrete3 = frete2;

    }else if(cep3.value === "88490000"){

        valorFrete3 = frete3;
    }

    // mostra os fretes
    elementoFrete1.textContent = "Frete: R$ " + valorFrete1.toFixed(2).replace(".", ",");

    elementoFrete2.textContent = "Frete: R$ " + valorFrete2.toFixed(2).replace(".", ",");

    elementoFrete3.textContent = "Frete: R$ " + valorFrete3.toFixed(2).replace(".", ",");

    return { valorFrete1, valorFrete2, valorFrete3
    };
}


function totalizartudo(){

    const totalTotal = document.getElementById("totalTotal");

    // Se n tiver na pagina do carrinho
    if (!totalTotal) {
        return;
    }

    // calcula produtos
    const produtos = totalizar();

    // calcula fretes
    const fretes = calcularfrete();

    // se alguma funçao n puder calcular
    if(!produtos || !fretes){
        return;
    }

    // soma tudo
    const total = produtos.p1 + produtos.p2 + produtos.p3 + produtos.p4 + fretes.valorFrete1 + fretes.valorFrete2 + fretes.valorFrete3;

    // mostra o total
    totalTotal.textContent = "Total: R$ " + total.toFixed(2).replace(".", ",");
}

if( document.getElementById("qtd1") || document.getElementById("qtd2") || document.getElementById("qtd3") || document.getElementById("qtd4")){

    totalizar();
    calcularfrete();
    totalizartudo();

}

