<?php
session_start();
require_once "conexao.php";

$erro = "";
$sucesso = false;
$nome = $login = $cpf = $data = $email = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $nome  = trim($_POST["nome"] ?? "");
    $login = trim($_POST["login"] ?? "");
    $senha = $_POST["senha"] ?? "";
    $cpf   = trim($_POST["cpf"] ?? "");
    $data  = $_POST["data"] ?? "";
    $email = trim($_POST["email"] ?? "");

    // lista dos campos que estão vazios
    $camposVazios = [];

    if ($nome === "")  { $camposVazios[] = "Nome"; }
    if ($login === "") { $camposVazios[] = "Login"; }
    if ($senha === "") { $camposVazios[] = "Senha"; }
    if ($cpf === "")   { $camposVazios[] = "CPF"; }
    if ($data === "")  { $camposVazios[] = "Data de nascimento"; }
    if ($email === "") { $camposVazios[] = "E-mail"; }

    if (count($camposVazios) === 1) {

        $erro = "O campo " . $camposVazios[0] . " é obrigatório!";

    } elseif (count($camposVazios) > 1) {

        $erro = "Os campos " . implode(", ", $camposVazios) . " são obrigatórios!";

    } else {

        // verifica se o login ja existe
        $stmt = $pdo->prepare("SELECT id FROM usuarios WHERE login = :login");
        $stmt->execute([":login" => $login]);

        if ($stmt->fetch()) {

            $erro = "Este login já está cadastrado!";

        } else {

            // verifica se o cpf ja existe
            $stmt = $pdo->prepare("SELECT id FROM usuarios WHERE cpf = :cpf");
            $stmt->execute([":cpf" => $cpf]);

            if ($stmt->fetch()) {

                $erro = "Este CPF já está cadastrado!";

            } else {

                // salva o usuario, com a senha em hash
                $stmt = $pdo->prepare(
                    "INSERT INTO usuarios (nome, login, senha, cpf, data_nascimento, email)
                     VALUES (:nome, :login, :senha, :cpf, :data, :email)"
                );

                $stmt->execute([
                    ":nome"  => $nome,
                    ":login" => $login,
                    ":senha" => password_hash($senha, PASSWORD_DEFAULT),
                    ":cpf"   => $cpf,
                    ":data"  => $data,
                    ":email" => $email
                ]);

                $sucesso = true;
            }
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
    <link href="https://fonts.googleapis.com/css2?family=Felipa&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <title>Cadastro</title>
</head>

<body>

<header>
    <div class="menu">

        <div class="nome">
            <img src="logo.jpg" alt="logo" id="logo">
            <h1 id="nome">Open Book</h1>
        </div>

        <div class="submenu-cima">

            <nav>
                <ul>
                    <li><a href="index.php">Início</a></li>
                    <li><a href="login.php">Login</a></li>
                    <li><a href="cadastro.php">Cadastro</a></li>
                    <li><a href="carrinho.php">Carrinho</a></li>
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

            <form action="cadastro.php" method="post" onsubmit="verificar(event)">

                <h2 id="titulo_pagina">Cadastro</h2>

                <div id="mensagem-erro"> </div>

                <div id="campo">
                    <label for="name"> Nome Completo: </label><br>
                    <input type="text" id="name" name="nome" value="<?php echo htmlspecialchars($nome); ?>">
                </div>

                <div id="campo">
                    <label for="login"> Login: </label><br>
                    <input type="text" id="login" name="login" value="<?php echo htmlspecialchars($login); ?>">
                </div>

                <div id="campo">
                    <label for="senha"> Senha: </label><br>
                    <input type="password" id="senha" name="senha">
                </div>

                <div id="campo">
                    <label for="cpf"> Cpf: </label><br>
                    <input type="text" id="cpf" name="cpf" maxlength="11" value="<?php echo htmlspecialchars($cpf); ?>">
                </div>

                <div id="campo">
                    <label for="date"> Data de nascimento: </label><br>
                    <input type="date" id="date" name="data" value="<?php echo htmlspecialchars($data); ?>">
                </div>
                
                <div id="campo">
                    <label for="email"> Email: </label><br>
                    <input type="email" id="email" name="email" value="<?php echo htmlspecialchars($email); ?>">
                </div>

                <div id="campo" class="button">
                    <button type="submit">Cadastrar</button>
                    <button type="reset"> Limpar </button>        
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
<script>exibirErroPHP(<?php echo json_encode($erro, JSON_UNESCAPED_UNICODE | JSON_HEX_TAG); ?>, 55);</script>
<?php } ?>

<?php if ($sucesso) { ?>
<script>
    alert("Cadastro realizado com sucesso!");
    window.location.href = "login.php";
</script>
<?php } ?>

</body>
</html>