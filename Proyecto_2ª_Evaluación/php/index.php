<?php
include "config.php";

$request = $_GET['request'] ?? '';
$data = json_decode(file_get_contents("php://input"), true);

// Obtener todos los usuarios
if ($_SERVER['REQUEST_METHOD'] === "GET" && $request === "users") {
    $sql = "SELECT idUsuario, nombre, apellido, fecha_nacimiento, usuario FROM users";
    $result = $conn->query($sql);
    $users = [];

    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }

    echo json_encode($users);
}

// Agregar usuario
if ($_SERVER['REQUEST_METHOD'] === "POST" && $request === "users") {
    $nombre = $data['nombre'];
    $apellido = $data['apellido'];
    $fecha_nacimiento = $data['fecha_nacimiento'];
    $usuario = $data['usuario'];
    $contraseña = password_hash($data['contraseña'], PASSWORD_DEFAULT);

    $sql = "INSERT INTO users (nombre, apellido, fecha_nacimiento, usuario, contraseña) VALUES ('$nombre', '$apellido', '$fecha_nacimiento', '$usuario', '$contraseña')";

    echo json_encode(["message" => $conn->query($sql) ? "Usuario agregado" : "Error: " . $conn->error]);
}

// Eliminar usuario
if ($_SERVER['REQUEST_METHOD'] === "DELETE" && preg_match("/users\/(\d+)/", $request, $matches)) {
    $idUsuario = $matches[1];
    $sql = "DELETE FROM users WHERE idUsuario=$idUsuario";
    echo json_encode(["message" => $conn->query($sql) ? "Usuario eliminado" : "Error: " . $conn->error]);
}

$conn->close();
?>
