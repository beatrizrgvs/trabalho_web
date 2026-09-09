/* \\\\Copyright no footer\\\\ */
document.getElementById("current-year").textContent = new Date().getFullYear();

/* \\\\Pagina cadastro\\\\ */

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
    if ( nome === "" || login === "" || senha === "" || cpf === "" || data === "" || email === "") {

        erroDiv.innerHTML = `<p>Erro: Todos os campos são obrigatórios!</p>`;

        erroDiv.style.display = "block";

        divs.forEach(div => {
                div.style.paddingLeft = "100px"
        })

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

    // pega os usuários já cadastrados
    let usuarios = JSON.parse(localStorage.getItem("cadastroUsuarios")) || [];

    // adiciona o novo usuário
    usuarios.push(dadosUsuario);

    // salva todos os usuários
    localStorage.setItem(
        "cadastroUsuarios", JSON.stringify(usuarios)
    );

    // teste para confirmar que salvou
    console.log(localStorage.getItem("cadastroUsuarios"));

    alert("Cadastro realizado com sucesso!");

    // vai pro login
    window.location.href = "login.html";

}

/* \\\\Pagina login\\\\ */

document.getElementById("form-login").addEventListener("submit", function(event) {

    event.preventDefault();

    const login = document.getElementById("login").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const erroDiv = document.getElementById("mensagem-erro");
    const divs = document.querySelectorAll(".login-cadastro #campo");

    // campo vazio
    if (login === "" || senha === "") {

        erroDiv.innerHTML = "<p>Erro: Todos os campos são obrigatórios!</p>";

        erroDiv.style.display = "block";

        divs.forEach(div => {
            div.style.paddingLeft = "100px"
        })

        return;
    }

    // procura o cadastro no LocalStorage
    const textoSalvo = localStorage.getItem("cadastroUsuarios");

    // nao existe cadastro
    if (textoSalvo === null) {

        erroDiv.innerHTML = "<p>Erro: Nenhum usuário cadastrado neste navegador!</p>";

        erroDiv.style.display = "block";
        divs.forEach(div => {
            div.style.paddingLeft = "100px"
        })

        return;
    }

    // converte os dados salvos
    const usuarios = JSON.parse(textoSalvo);

    const usuario = usuarios.find(function(usuario) { 
        return usuario.login === login && usuario.senhaUsuario === senha;
    });

    // login correto
    if(usuario){

        erroDiv.style.display = "none";

        alert("Login realizado com sucesso!");

         localStorage.setItem("usuarioLogado", JSON.stringify(usuario))

        window.location.href = "index.html";

    }

    // login incorreto
    else{

        erroDiv.innerHTML = "<p>Erro: Login ou senha incorretos!</p>";

        erroDiv.style.display = "block";

        divs.forEach(div => {
            div.style.paddingLeft = "50px"
        })
    }
});

/* \\\\Carrinho\\\\ */

// Preço constante
const v1 = 42.99;
const v2 = 19.90;
const v3 = 54.02;
const v4 = 69.90;

// valor constante dos fretes
const f1 = 5;
const f2 = 8;
const f3 = 10;

//função para atualizar automaticamente o preço por quant
function totalizar() {
    let qtd1 = document.getElementById('qtd1'); 
    let qtd2 = document.getElementById('qtd2');
    let qtd3 = document.getElementById('qtd3');
    let qtd4 = document.getElementById('qtd4');

    // multiplicações por quant
    var p1 = (qtd1.value) * v1;
    var p2 = (qtd2.value) * v2;
    var p3 = (qtd3.value) * v3;
    var p4 = (qtd4.value) * v4;
    
    let total1 = document.getElementById('total1');
    total1.innerHTML = "Preço total R$ " + p1.toFixed(2);

    let total2 = document.getElementById('total2');
    total2.innerHTML = "Preço total: R$ " + p2.toFixed(2);

    let total3 = document.getElementById('total3');
    total3.innerHTML = "Preço total: R$ " + p3.toFixed(2);

    let total4 = document.getElementById('total4');
    total4.innerHTML = "Preço total: R$ " + p4.toFixed(2);
}

// função para rodar toda vez que o valor das caixinhas mudar
document.getElementById('qtd1').addEventListener('input', totalizar);
document.getElementById('qtd2').addEventListener('input', totalizar);
document.getElementById('qtd3').addEventListener('input', totalizar);
document.getElementById('qtd4').addEventListener('input', totalizar);

// Executa uma vez ao abrir a página para carregar os valores iniciais na tela
totalizar();

    function calcularfrete (){
        let cep1 = document.getElementById ('cep1');
        let cep2 = document.getElementById ('cep2');
        let cep3 = document.getElementById ('cep3');
        let f1 = document.getElementById ('f1');
        let f2 = document.getElementById ('f2')
        let f3 = document.getElementById ('f3');

        var Vfrete1=0
        var Vfrete2=0
        var Vfrete3=0
    
        if (cep1.value ==="88495000") {
            Vfrete1 = f1;
            //alert ("to passando aqui 1");
        }else if (cep1.value === "88780000" ){
            Vfrete1 = f2; 
            //alert ("to passando aqui 2");
        }else if (cep1.value === "88490000"){
            Vfrete1 = f3;
            //alert ("to passando aqui 3");
        }
        else{
            Vfrete1= 0;
        }

        if (cep2.value ==="88495000") {
            Vfrete2 = f1;
            //alert ("to passando aqui 1");
        }else if (cep2.value === "88780000" ){
            Vfrete2 = f2; 
            //alert ("to passando aqui 2");
        }else if (cep2.value === "88490000"){
            Vfrete2 = f3;
            //alert ("to passando aqui 3");
        } 
        else{
            Vfrete2= 0;
        }

        if (cep3.value ==="88495000") {
            Vfrete3 = f1;
            //alert ("to passando aqui 1");
        }else if (cep3.value === "88780000" ){
            Vfrete3 = f2; 
            //alert ("to passando aqui 2");
        }else if (cep3.value === "88490000"){
            Vfrete3 = f3;
            //alert ("to passando aqui 3");
        } 
        else{
            Vfrete3= 0;
        }

        f1.innerHTML = Vfrete1
        f2.innerHTML = Vfrete2
        f3.innerHTML = Vfrete3
    }

calcularfrete()

function totalizartudo () {

    let totalTotal = document.getElementById ('totalTotal');
    totalTotal.innerHTML = (p1)+(p2)+(p3)+Vfrete1+Vfrete2+Vfrete3;
    alert (totalTotal.innerHTML);
}

totalizartudo()

