<?php
session_start();
require_once "conexao.php";

$erro = "";
$paddingErro = 50;
$loginOk = false;
$login = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $login = trim($_POST["login"] ?? "");
    $senha = $_POST["senha"] ?? "";

    // verifica campos vazios
    if ($login === "" || $senha === "") {

        $erro = "Todos os campos são obrigatórios!";
        $paddingErro = 100;

    } else {

        // procura o usuario pelo login
        $stmt = $pdo->prepare("SELECT id, nome, login, senha FROM usuarios WHERE login = :login");
        $stmt->execute([":login" => $login]);
        $usuario = $stmt->fetch();

        // isso compara a senha digitada com o hash guardado no banco
        if ($usuario && password_verify($senha, $usuario["senha"])) {

            // cria a sessao
            session_regenerate_id(true);

            $_SESSION["usuario_id"]    = $usuario["id"];
            $_SESSION["usuario_nome"]  = $usuario["nome"];
            $_SESSION["usuario_login"] = $usuario["login"];

            $loginOk = true;

        } else {

            // login incorreto
            $erro = "Login ou senha incorretos!";
        }
    }
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="Trabalho1.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Felipa&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"rel="stylesheet">

    <title>Login</title>

</head>

<body>
<header>

    <div class="menu">

        <div class="nome">
            <img src="logo.jpg" alt="logo" id="logo">
            <h1 id="nome"> Open Book</h1>
        </div>

        <div class="submenu-cima">

            <nav>
                <ul>
                    <li><a href="index.php"> Início </a></li>
                    <li><a href="login.php"> Login </a></li>
                    <li><a href="cadastro.php"> Cadastro </a></li>
                    <li><a href="carrinho.php"> Carrinho </a></li>
                    <?php if (isset($_SESSION["usuario_id"])) { ?>
                    <li><a href="logout.php">Sair</a></li>
                    <?php } ?>
                </ul>
            </nav>

            <form>
               <div class="caixa-busca">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input type="search" id="busca" name="q" placeholder="Pesquisar...">
                    <button type="submit">Buscar</button>
                </div>
            </form>

        </div>
    </div>

</header>

    <div class="login-cadastro-body">
        <div class="login-cadastro">
           <form action="login.php" method="post" id="form-login">

                <h2 id="titulo_pagina">Login</h2>

                <div id="mensagem-erro"></div>

                <div id="campo">
                    <label for="login">Login:</label><br>
                    <input type="text" id="login" name="login" value="<?php echo htmlspecialchars($login); ?>">
                </div>

                <div id="campo">
                    <label for="senha">Senha:</label><br>
                    <input type="password" id="senha" name="senha">
                </div>

                <div id="campo" class="button">
                    <button type="submit">Login</button>
                    <button type="reset">Limpar</button>
                </div>

            </form>
        </div>
    </div>

<footer>
    <div class="rodape-final">
        <p>&copy; <span id="current-year"></span> OpenBook</p>
    </div>
</footer>

<script src="Scripts.js"></script>

<?php if ($erro !== "") { ?>
<script>exibirErroPHP(<?php echo json_encode($erro, JSON_UNESCAPED_UNICODE | JSON_HEX_TAG); ?>, <?php echo $paddingErro; ?>);</script>
<?php } ?>

<?php if ($loginOk) { ?>
<script>
    alert("Login realizado com sucesso!");
    window.location.href = "index.php";
</script>
<?php } ?>

</body>
</html> 