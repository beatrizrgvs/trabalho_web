CREATE DATABASE IF NOT EXISTS `openbook`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `openbook`;

-- ---------------------------------------------------------------------
-- Tabela de usuários
-- ---------------------------------------------------------------------
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id`              INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome`            VARCHAR(100) NOT NULL,
  `login`           VARCHAR(30)  NOT NULL,
  `senha`           VARCHAR(255) NOT NULL,
  `cpf`             VARCHAR(20)  NOT NULL,
  `data_nascimento` DATE         NOT NULL,
  `email`           VARCHAR(120) NOT NULL,
  `criado_em`       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_usuarios_login` (`login`),
  UNIQUE KEY `uk_usuarios_cpf`   (`cpf`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Tabela de produtos (livros)
-- ---------------------------------------------------------------------
DROP TABLE IF EXISTS `produtos`;
CREATE TABLE `produtos` (
  `id`        INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  `nome`      VARCHAR(150)  NOT NULL,
  `preco`     DECIMAL(10,2) NOT NULL,
  `imagem`    VARCHAR(255)  NOT NULL,
  `descricao` TEXT          NULL,
  `editora`   VARCHAR(100)  NULL,
  `ano`       SMALLINT      NULL,
  `isbn`      VARCHAR(20)   NULL,
  `genero`    VARCHAR(50)   NULL,
  `paginas`   SMALLINT      NULL,
  `capa`      VARCHAR(30)   NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `produtos`
  (`nome`, `preco`, `imagem`, `descricao`, `editora`, `ano`, `isbn`, `genero`, `paginas`, `capa`)
VALUES
('Orgulho e Preconceito', 42.99, 'orgulho-e-preconceito.jpg', 'Jane Austen inicia Orgulho e Preconceito com uma das mais célebres frases da literatura inglesa: “É uma verdade universalmente reconhecida que um homem solteiro e muito rico deve precisar de uma esposa”. O livro é o mais famoso da escritora — traz uma série de personagens inesquecíveis e um enredo memorável.', 'Penguin-Companhia', 2011, '8563560158', 'Romance', 576, 'Dura'),
('O Pequeno Príncipe', 19.90, 'pequenoprincipe.jpg', 'Nesta história que marcou gerações de leitores em todo o mundo, um piloto cai com seu avião no deserto do Saara e encontra um pequeno príncipe, que o leva a uma aventura filosófica e poética através de planetas que encerram a solidão humana. Um livro para todos os públicos, O pequeno príncipe é uma obra atemporal, com metáforas pertinentes e aprendizados sobre afeto, sonhos, esperança e tudo aquilo que é invisível aos olhos.', 'Clássicos Zahar', 2015, '9788537814741', 'Ficção', 133, 'Comum'),
('1984', 54.02, '1984.jpg', 'Winston Smith, número 6079, ocupa uma função comum no Departamento de Documentação: “retificar” fatos de acordo com as orientações do Ministério da Verdade. E ele não mede esforços em seu objetivo de erradicar, em todos os níveis, quaisquer elementos que ameacem sua existência. A individualidade, o livre-arbítrio, o pensamento crítico, o amor – todos considerados transgressões inadmissíveis – são punidos com o máximo de rigor e severidade. Nada escapa aos olhos do Grande Irmão, o grande líder do regime, e é por meio de sua vigilância intensiva, cujos “olhos eram capazes de o seguir (…) em moedas, estampas, capas de livros, bandeiras, pôsteres e invólucros de pacotes de cigarro”, que o regime se certifica milimetricamente da soberania de seu poder. Por outro lado, Winston se sente ávido por conhecer algum tipo de liberdade. Assim, pouco a pouco avança em seus atos de resistência em busca de reavivar sua humanidade, obliterada por décadas da repressão política incidente no mais profundo nível de seus pensamentos e lembranças. Entretanto, para realizar seu desejo ele precisará desviar cuidadosamente de um perigoso campo minado sob o escrutínio do Partido e do Grande Irmão.', 'Excelsior', 2021, '978-6587435169', 'Ficção', 316, 'Dura'),
('Cem Anos de Solidão', 69.90, 'cemanos.jpg', 'Em Cem anos de solidão , um dos maiores clássicos da literatura, o prestigiado autor narra a incrível e triste história dos Buendía - a estirpe de solitários para a qual não será dada “uma segunda oportunidade sobre a terra” e apresenta o maravilhoso universo da fictícia Macondo, onde se passa o romance. É lá que acompanhamos diversas gerações dessa família, assim como a ascensão e a queda do vilarejo.', 'Record', 1977, '9788501012074', 'Fantasia', 448, 'Comum'),
('A Metamorfose', 23.55, 'metamorfose.jpg', 'O caixeiro-viajante Gregor acorda metamorfoseado em um enorme inseto e percebe que tudo mudou e não só em sua vida, mas no mundo. Ele, então, acompanha as reações de sua família ao perceberem o estranho ser em que ele se tornou. E, enquanto luta para se manter vivo, reflete sobre o comportamento de seus pais, de sua irmã e sobre a sua nova vida.', 'Principis', 2019, '8594318782', 'Ficção', 96, 'Dura'),
('Frankenstein', 16.90, 'Frankenstein.jpg', 'Victor Frankenstein desde muito jovem se dedicou aos estudos da filosofia e das ciências naturais. Até que, em uma experiência bem-sucedida (que lhe sugou a energia e o afastou do convívio dos seus entes queridos), ele foi capaz de dar vida a um ser de feições e trejeitos assustadores. A partir de então, criador e criatura passam a viver um jogo de perseguição repleto de sangue e horror, a primeira obra de ficção científica da literatura e um clássico do terror.', 'Principis', 2019, '8594318111', 'Ficção', 240, 'Comum'),
('Dom Casmurro', 71.66, 'DomCasmurro.jpg', 'Obra clássica do Realismo brasileiro e uma das mais famosas de Machado de Assis. Dom Casmurro é o romance mais estudado, comentado e discutido de Machado de Assis – o que significa dizer um dos mais estudados da Literatura brasileira. Publicado originalmente em 1899, o livro conta a história de Bentinho e Capitu, desde o namoro juvenil até o casamento atormentado pelo ciúme e pela dúvida que virou polêmica literária: Capitu traiu o marido com o melhor amigo dele, Escobar? Os fatos são narrados por Bentinho, que relembra, já em idade avançada, episódios de sua vida, de maneira subjetiva e passional.', 'Edições Best Bolso', 2016, '978-8577995189', 'Romance', 269, 'Dura'),
('Dom Quixote', 67.00, 'domQuixote.jpg', 'De tanto ler antigos livros de cavalaria, o pacato Alonso Quijano perde o juízo e resolve levar a vida de um cavaleiro andante. Depois de equipar-se com a velha armadura herdada dos bisavós e de fazer-se ordenar por um estalajadeiro, transforma-se no mui afamado Dom Quixote de La Mancha. Na companhia do cavalo Rocinante e do fiel escudeiro Sancho Pança, sai mundo afora em busca de aventuras. Pelo caminho, o engenhoso fidalgo encontra uma caravana de beneditinos, uma procissão de penitentes e os famosos moinhos de vento - porém a sede de aventuras, agravada pela sandice, leva-o a ver bruxos, fantasmas e hordas de gigantes.', 'L&PM', 2007, '8525433632', 'Infanto juvenil', 64, 'Comum');


CREATE TABLE avaliacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    livro_id INT(10) UNSIGNED NOT NULL,
    usuario_id INT(10) UNSIGNED NOT NULL,
    usuario VARCHAR(30) NOT NULL,
    nota INT NOT NULL,
    comentario TEXT NOT NULL,
    data_avaliacao DATE NOT NULL,

    CONSTRAINT fk_avaliacao_produto
        FOREIGN KEY (livro_id)
        REFERENCES produtos(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_avaliacao_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE
);