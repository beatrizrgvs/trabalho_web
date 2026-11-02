<?php
session_start();
require_once "conexao.php";

$mensagem_avaliacao = "";

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["enviar_avaliacao"])) {

    if (!isset($_SESSION["usuario_id"])) {
        $mensagem_avaliacao = "Você precisa entrar na sua conta para avaliar.";
    } else {
        $nota = filter_input(INPUT_POST, "nota", FILTER_VALIDATE_INT);
        $comentario = trim($_POST["comentario"] ?? "");

        if (!$nota || $nota < 1 || $nota > 5 || $comentario === "") {
            $mensagem_avaliacao = "Informe uma nota de 1 a 5 e escreva seu comentário.";
        } else {
            try {
                $sql = "INSERT INTO avaliacoes
                        (livro_id, usuario_id, usuario, nota, comentario, data_avaliacao)
                        VALUES
                        (:livro_id, :usuario_id, :usuario, :nota, :comentario, CURDATE())";

                $stmt = $pdo->prepare($sql);

                $stmt->execute([
                    ":livro_id" => 1,
                    ":usuario_id" => $_SESSION["usuario_id"],
                    ":usuario" => $_SESSION["usuario_login"],
                    ":nota" => $nota,
                    ":comentario" => $comentario
                ]);

                header("Location: livro1.php?avaliacao=sucesso");
                exit;

            } catch (PDOException $e) {
                $mensagem_avaliacao = "Não foi possível salvar sua avaliação.";
            }
        }
    }
}

if (isset($_GET["avaliacao"]) && $_GET["avaliacao"] === "sucesso") {
    $mensagem_avaliacao = "Sua avaliação foi enviada com sucesso!";
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
    <link href="https://fonts.googleapis.com/css2?family=Felipa&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">   
    <title>1984</title>
</head>

<body>
<input
    type="hidden"
    id="usuario-logado"
    value="<?php echo isset($_SESSION['usuario_id']) ? 'sim' : 'nao'; ?>"
>
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

<h1 id="titulo_pagina">Detalhes do livro</h1>

<div class="produto_detalhes">
            
    <img id="imagem_produto" class="foto" src=1984.jpg alt="1984">

    <ul>
        <li id="produto_nome_detalhes"> 1984 </li> 

        <li id="preco_vista"> Preço à vista: R$ 54,02 </li>

        <li>
            <label for="parcelas">Preço parcelado (até 5 vezes):</label>
            <select id="parcelas" name="parcelamentos">
                <option value="1">1x: R$ XX,XX</option>
                <option value="2">2x: R$ XX,XX</option>
                <option value="3">3x: R$ XX,XX</option>
                <option value="4">4x: R$ XX,XX</option>
                <option value="5">5x: R$ XX,XX</option>
            </select>
        </li>

        <li>
            <label for="prazo">Prazo de entrega:</label>
            <input id="prazo" type="date" value="2026-04-15" readonly>
        </li>

        <li>
            <label for="qnt">Quantidade:</label>
            <input id="qnt" type="number" name="qnt" min="1" max="10" step="1" value="1">
        </li>

        <li>
            <label for="pagamento">Formas de pagamento:</label>
            <select id="pagamento" name="pagamentos">
                <option value="visa">Cartão de crédito Visa</option>
                <option value="mastercard">Cartão de crédito Mastercard</option>
                <option value="debito">Cartão de débito</option>
                <option value="pix">Pix</option>
                <option value="boleto">Boleto bancário</option>
            </select>
        </li>

        <li id="total_preco">Preço total: R$ 54,02</li>

    </ul>
</div>

<?php if (isset($_SESSION["usuario_id"])) { ?>

    <div class="button" id="botao_comprar">
        <button type="button" onclick="add_carrinho()">
            Adicionar ao carrinho
        </button>
    </div>

<?php } else { ?>

    <div class="button" id="botao_comprar">
        <button type="button" onclick="window.location.href='login.php'">
            Adicionar ao carrinho
        </button>
    </div>

<?php } ?>

<p class="descricao_avaliacao">Descrição e detalhes do produto</p>
<p class="descricao_texto"> Winston Smith, número 6079, ocupa uma função comum no Departamento de Documentação: “retificar” fatos de acordo com as orientações do Ministério da Verdade. E ele não mede esforços em seu objetivo de erradicar, em todos os níveis, quaisquer elementos que ameacem sua existência. A individualidade, o livre-arbítrio, o pensamento crítico, o amor – todos considerados transgressões inadmissíveis – são punidos com o máximo de rigor e severidade. Nada escapa aos olhos do Grande Irmão, o grande líder do regime, e é por meio de sua vigilância intensiva, cujos “olhos eram capazes de o seguir (…) em moedas, estampas, capas de livros, bandeiras, pôsteres e invólucros de pacotes de cigarro”, que o regime se certifica milimetricamente da soberania de seu poder. Por outro lado, Winston se sente ávido por conhecer algum tipo de liberdade. Assim, pouco a pouco avança em seus atos de resistência em busca de reavivar sua humanidade, obliterada por décadas da repressão política incidente no mais profundo nível de seus pensamentos e lembranças. Entretanto, para realizar seu desejo ele precisará desviar cuidadosamente de um perigoso campo minado sob o escrutínio do Partido e do Grande Irmão. </p>

<table class="tabela_detalhes">

    <tr>

        <th>Editora:</th>
        <td>Excelsior</td>

    </tr>

    <tr>

        <th>Ano da edição:</th>
        <td>2021</td>

    </tr>

    <tr>

        <th>ISBN:</th>
        <td>978-6587435169</td>
        
    </tr>

    <tr>

        <th>Gênero:</th>
        <td>Ficção</td>
        
    </tr>

    <tr>

        <th>Número de paginas:</th>
        <td>316 páginas</td>
        
    </tr>

    <tr>

        <th>Estilo de capa:</th>
        <td>Dura</td>
        
    </tr>

</table>

<?php
$sql = "SELECT usuario, nota, comentario, data_avaliacao
        FROM avaliacoes
        WHERE livro_id = :livro_id
        ORDER BY data_avaliacao DESC";

$stmt = $pdo->prepare($sql);
$stmt->execute([
    ":livro_id" => 3
]);

$avaliacoes = $stmt->fetchAll();
?>

<p class="descricao_avaliacao">Avaliações</p>

<div class="avaliacoes">

    <?php if (!empty($avaliacoes)): ?>

        <?php foreach ($avaliacoes as $avaliacao): ?>

            <ul>
                <li>
                    <strong>
                        <?= htmlspecialchars($avaliacao["usuario"]) ?>
                    </strong>
                </li>

                <li class="data_ava">
                    <label>Data da avaliação:</label>
                    <input
                        type="date"
                        value="<?= htmlspecialchars($avaliacao["data_avaliacao"]) ?>"
                        readonly
                    >
                </li>

                <li class="estrelas">
                    <?= str_repeat("⭐", (int)$avaliacao["nota"]) ?>
                </li>

                <li>
                    <?= nl2br(htmlspecialchars($avaliacao["comentario"])) ?>
                </li>
            </ul>

        <?php endforeach; ?>

    <?php else: ?>

        <p>Este livro ainda não possui avaliações.</p>

    <?php endif; ?>

</div>

<p class="descricao_avaliacao">Deixe sua avaliação</p>

<div class="avaliacoes">

    <?php if (isset($_SESSION["usuario_id"])): ?>

        <?php if ($mensagem_avaliacao !== ""): ?>
            <p><?= htmlspecialchars($mensagem_avaliacao) ?></p>
        <?php endif; ?>

        <form method="POST" action="livro1.php" class="form-avaliacao">

            <div class="campo-avaliacao">
                <label for="nota">Sua nota:</label>

                <select name="nota" id="nota" required>
                    <option value="">Escolha uma nota</option>
                    <option value="5">⭐⭐⭐⭐⭐</option>
                    <option value="4">⭐⭐⭐⭐</option>
                    <option value="3">⭐⭐⭐</option>
                    <option value="2">⭐⭐</option>
                    <option value="1">⭐</option>
                </select>
            </div>

            <div class="campo-avaliacao comentario">
                <label for="comentario">Seu comentário:</label>

                <textarea
                    name="comentario"
                    id="comentario"
                    rows="4"
                    required
                    placeholder="Escreva sua avaliação..."
                ></textarea>
            </div>

            <button type="submit" name="enviar_avaliacao">
                Enviar avaliação
            </button>

        </form>

    <?php else: ?>

        <p>
            <a href="login.php">Entre na sua conta</a>
            para avaliar este livro.
        </p>

    <?php endif; ?>

</div>
<footer>
    <div class="rodape-final">
        <p>&copy; <span id="current-year"></span> OpenBook</p>
    </div>
</footer>

<script src="Scripts.js"></script>

</body>

</html>