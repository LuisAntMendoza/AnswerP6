<?php
//constantes de los cifrados y la BD
define("HOST", "localhost");
define("USER", "adminAnswerP6");
define("PASS", "DB4dm1n-Pseis");
define("DB", "AnswerP6");
define("PASSWORD", "Shrek Amo Del Multiverso");
define("HASH", "sha256");
define("METHOD", "aes-128-cbc-hmac-sha1");

//nos conectamos a la BD
function conectarBD() {
	$conn = mysqli_connect(HOST, USER, PASS, DB);

	 if (!$conn) {
	 	die("Connection failed: " . mysqli_connect_error());
	 }
	return $conn;
}

//funcion para cifrar
function Cifrar($text){
  $key = openssl_digest(PASSWORD, HASH);
  $iv_len = openssl_cipher_iv_length (METHOD);
  $iv = openssl_random_pseudo_bytes ($iv_len);

  $key = openssl_digest(PASSWORD,HASH);

  $rawCiff = openssl_encrypt(
  $text,
  METHOD,
  $key,
  OPENSSL_RAW_DATA,
  $iv
  );
  $textoCifrado = base64_encode($iv.$rawCiff);

  return $textoCifrado;
}

//funcion para Decifrar
function Decifrar ($textoCifrado){
  $key = openssl_digest(PASSWORD, HASH);
  $iv_len = openssl_cipher_iv_length (METHOD);

  $cifrado = base64_decode($textoCifrado);
  $iv = substr($cifrado, 0, $iv_len);
  $rawCiff = substr($cifrado, $iv_len);

  $originalText = openssl_decrypt(
  $rawCiff,
  METHOD,
  $key,
  OPENSSL_RAW_DATA,
  $iv
  );
  return $originalText;
}

?>
