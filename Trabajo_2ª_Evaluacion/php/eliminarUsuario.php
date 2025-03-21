<?php
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    parse_str($_SERVER['QUERY_STRING'], $params);
    $idUsuario = $params['idUsuario'] ?? null;

    if ($idUsuario) {
        $sql = "DELETE FROM usuarios WHERE idUsuario=$idUsuario";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(["message" => "Usuario eliminado"]);
            http_response_code(200);
        } else {
            echo json_encode(["error" => "Error: " . $conn->error]);
            http_response_code(response_code: 500);
        }
        $conn->close();
    } else {
        echo "No se proporcionó idUsuario";
    }
}
?>