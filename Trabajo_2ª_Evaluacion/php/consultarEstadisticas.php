<?php
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    parse_str($_SERVER['QUERY_STRING'], $params);
    $idUsuario = $params['idUsuario'] ?? null;

    if ($idUsuario) {
        $sql = "SELECT AVG(lenta) as valorMedio, MIN(lenta) as valorMinimo, MAX(lenta) as valorMaximo FROM controlglucosa WHERE idUsuario = $idUsuario;";
        
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $valores = $result->fetch_assoc(); // Obtiene la primera (y única) fila como un array asociativo
        }
        
        // Comprobar si alguna de las columnas es NULL
    if (is_null($valores['valorMedio']) || is_null($valores['valorMinimo']) || is_null($valores['valorMaximo'])) {
        echo json_encode(["error" => "Error: No se han encontrado estadisticas validas para este usuario"]);
        http_response_code(500);
        exit();
    }
        echo json_encode($valores);
        $conn->close();
    } else {
        echo "No se proporcionó idUsuario";
    }
}
?>