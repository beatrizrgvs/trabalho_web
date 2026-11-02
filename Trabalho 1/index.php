<?php
session_start();
require_once "conexao.php";

// busca os produtos cadastrados no banco
$produtos = $pdo->query("SELECT id, nome, preco, imagem FROM produtos ORDER BY id")->fetchAll();
$linhas = array_chunk($produtos, 4); 
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

    <title>Open Book</title>
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
                    <div id="sugestoes"></div>
                    <button type="submit">Buscar</button>
                </div>
            </form>

        </div>
    </div>
</header>

<h1 id="titulo_pagina">Mais vendidos</h1>

<div class="layout-principal">

    <div class="container-colunas">
        <div class="coluna">
            <h2>Filtros</h2>

            <ul>
                <li>Editora</li>
                <li>Estilo da capa</li>
                <li>Gênero</li>
                <li>Número de páginas</li>
                <li>Preço</li>
                <li>XXXX</li>
                <li>XXXX</li>
                <li>XXXX</li>
            </ul>
        </div>
    </div>

    <div class="resto-pagina">

        <?php foreach ($linhas as $linha) { ?>
        <div class="todososprodutos">
            <div class="produtinhos">

                <?php foreach ($linha as $livro) { ?>
                <a href="livro<?php echo $livro['id']; ?>.php" class="produto">
                    <img src="<?php echo htmlspecialchars($livro['imagem']); ?>" alt="livro" class="foto">
                    <div>
                        <p><?php echo htmlspecialchars($livro['nome']); ?></p>
                        <p>Preço: R$ <?php echo number_format($livro['preco'], 2, ",", "."); ?></p>
                        <strong>Mais detalhes...</strong>
                    </div>
                </a>
                <?php } ?>

            </div>
        </div>
        <?php } ?>

    </div>
</div>

<footer>
    <div class="rodape-final">
        <p>&copy; <span id="current-year"></span> OpenBook</p>
    </div>
</footer>

<script src="Scripts.js"></script>

</body>
</html>