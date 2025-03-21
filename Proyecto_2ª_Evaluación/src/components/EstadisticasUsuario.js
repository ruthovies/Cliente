import GlucoseChart from "./GloucoseChart";

export default function EstadisticasUsuario({ valorMedio, valorMinimo, valorMaximo, cerrarEstadisticaCb }) {
    return (
        <div className="container mt-4 p-4 border rounded shadow bg-light text-center" style={{ maxWidth: "600px" }}>
            <h2 className="mb-3">📊 Estadísticas</h2>

            <div className="list-group mb-4">
                <p className="list-group-item">📈 <strong>Valor Medio:</strong> {valorMedio}</p>
                <p className="list-group-item">📉 <strong>Valor Mínimo:</strong> {valorMinimo}</p>
                <p className="list-group-item">📊 <strong>Valor Máximo:</strong> {valorMaximo}</p>
            </div>

            <GlucoseChart valorMinimo={valorMinimo} valorMedio={valorMedio} valorMaximo={valorMaximo} />

            {/* EL BOTONACO FLAMA 😎🔥 */}
            <button className="btn btn-danger mt-4 w-50 fw-bold" onClick={cerrarEstadisticaCb}>
                ❌ Cerrar Estadísticas
            </button>
        </div>

    );
}