<?php
include 'config.php';
include 'validaciones.php';

// Comprobar cabeceras CORS
if ($_SERVER["REQUEST_METHOD"] === 'OPTIONS'){
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, content-type');
    http_response_code(200);
    exit();
}

// Comprobar si está la cabecera Content-Type con valor application/json
$headerArray = getallheaders();
$contentType = $headerArray['Content-Type'];
if ($contentType != "application/json"){
    header("HTTP/1.1 406 Not Acceptable");
    header("Content-Type: application/json; charset=UTF-8");
    echo json_encode(["error" => "Falta cabecera Content-Type con valor application/json"]);
}
// Comprobar si el método de la petición es POST
if ($_SERVER['REQUEST_METHOD'] != "POST"){
    header("HTTP/1.1 405 Method Not Allowed");
    header("Content-Type: application/json; charset=UTF-8");
    echo json_encode(["error" => "Método de la petición no permitido"]);
}

// Validaciones previas
// Comprobar que tenemos los parámetros nombre y apellidos
$data = json_decode(file_get_contents("php://input"), true);
$nombre = $data['nombre'];
$apellido = $data['apellido'];
$fecha_nacimiento = $data['fecha_nacimiento'];
$usuario = $data['usuario'];
$contraseña = password_hash($data['contraseña'], PASSWORD_DEFAULT); // Hashear la contraseña

if ($nombre == ''|| $apellido == ''){
    echo json_encode(["error" => "Error: Falta el nombre o el apellido"]);
    http_response_code(500);
    exit();
}
// Devuelve verdadero si pasa las validaciones, si no, devuelve el mensaje de error
$validarUsuario = validarUsuarioAñadir($usuario, $data['contraseña'], $fecha_nacimiento);
if ($validarUsuario !== true){
    echo json_encode(["error" => "Error: $validarUsuario"]);
    http_response_code(500);
    exit();
}

$sql = "INSERT INTO usuarios (nombre, apellido, fecha_nacimiento, usuario, password) VALUES ('$nombre', '$apellido', '$fecha_nacimiento', '$usuario', '$contraseña')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["message" => "Usuario agregado"]);
    http_response_code(200);
} else {
    echo json_encode(["error" => "Error: " . $conn->error]);
    http_response_code(500);
}

$conn->close();
?>