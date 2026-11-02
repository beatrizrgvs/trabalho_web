<?php
session_start();

// apaga os dados da sessão e encerra
session_unset();
session_destroy();

header("Location: login.php");
exit;
