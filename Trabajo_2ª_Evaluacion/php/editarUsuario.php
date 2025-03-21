<?php
include 'config.php';
include 'validaciones.php';

// Comprobar cabeceras CORS
if ($_SERVER["REQUEST_METHOD"] === 'OPTIONS'){
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: PUT, OPTIONS');
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
if ($_SERVER['REQUEST_METHOD'] != "PUT"){
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
$contraseña = password_hash($data['contraseña'], PASSWORD_DEFAULT); // Hashear la contraseña

if ($nombre == ''|| $apellido == ''){
    echo json_encode(["error" => "Error: Falta el nombre o el apellido"]);
    http_response_code(500);
    exit();
}

// Devuelve verdadero si pasa las validaciones, si no, devuelve el mensaje de error
$validarUsuario = validarUsuarioEditar( $data['contraseña'], $fecha_nacimiento);
if ($validarUsuario !== true){
    echo json_encode(["error" => "Error: $validarUsuario"]);
    http_response_code(500);
    exit();
}

$sql = "UPDATE usuarios SET nombre='$nombre', apellido='$apellido', fecha_nacimiento='$fecha_nacimiento', password='$contraseña' WHERE idUsuario=$idUsuario";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["message" => "Usuario editado"]);
    http_response_code(200);
} else {
    echo json_encode(["error" => "Error: " . $conn->error]);
    http_response_code(500);
}

$conn->close();
?>