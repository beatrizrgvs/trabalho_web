<?php
// conexao com o banco MariaDB 
$host  = "localhost";
$banco = "openbook";
$user  = "root";
$pass  = "";

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$banco;charset=utf8mb4",
        $user,
        $pass,
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]
    );
} catch (PDOException $e) {
    die("Erro ao conectar ao banco de dados. Verifique se o MySQL do XAMPP está ligado e se o banco openbook foi importado.");
}
