<?php
include 'config.php';

$sql = "SELECT idUsuario, nombre, apellido, fecha_nacimiento, usuario FROM usuarios"; // No mostrar la contraseña
$result = $conn->query($sql);
$users = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
}

echo json_encode($users);
$conn->close();
?>