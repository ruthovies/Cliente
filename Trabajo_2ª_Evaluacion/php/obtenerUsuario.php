<?php
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    parse_str($_SERVER['QUERY_STRING'], $params);
    $idUsuario = $params['idUsuario'] ?? null;

    if ($idUsuario) {
        $sql = "SELECT idUsuario, nombre, apellido, fecha_nacimiento, usuario FROM usuarios WHERE idUsuario=$idUsuario"; // No mostrar la contraseña


        $user = null;
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc(); // Obtiene la primera (y única) fila como un array asociativo
        }

        if ($user === null) {
            echo json_encode(["error" => "Error: No se ha encontrado el usuario"]);
            http_response_code(500);
            exit();
        }

        echo json_encode($user);
        $conn->close();
    } else {
        echo "No se proporcionó idUsuario";
    }
}
?>