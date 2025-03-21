import { useEffect, useState } from "react";
import EditUserForm from "./components/EditUserForm";
import EstadisticasUsuario from "./components/EstadisticasUsuario";

const API_BASE_URL= "http://localhost:8080/react/diabetes/php";
const endpoints = { //Recursos para la API. Si lo llamamos accedemos a ellos.
  "obtenerUsuarios": `${API_BASE_URL}/obtenerUsuarios.php`,
  "agregarUsuario": `${API_BASE_URL}/anadirUsuario.php`,
  "eliminarUsuario": `${API_BASE_URL}/eliminarUsuario.php`,
  "editarUsuario": `${API_BASE_URL}/editarUsuario.php`,
  "obtenerUsuario": `${API_BASE_URL}/obtenerUsuario.php`,
  "consultarEstadisticas": `${API_BASE_URL}/consultarEstadisticas.php`
}

function App() {
  const [users, setUsers] = useState([]);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState({
    message: null,
    serverError: null
  });
  const [editedUser, setEditedUser] = useState(null);
  const [errorEstadistica, setErrorEstadistica] = useState({
    message: null,
    error: false
  });
  const [estadisticas, setEstadisticas] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Obtener usuarios
  const fetchUsers = async () => {
    const res = await fetch(endpoints.obtenerUsuarios);
    const data = await res.json();
    setUsers(data);
  };

  // Agregar usuario
  const addUser = async () => {
    const res = await fetch(endpoints.agregarUsuario, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre,
        apellido,
        fecha_nacimiento: fechaNacimiento,
        usuario,
        contraseña,
      }),
    });
    const resJSON = await res.json()
    if (!res.ok) {
      setError({ message: "Error al agregar usuario", serverError: resJSON.error === undefined ? res.statusText : resJSON.error });
    }
    setNombre("");
    setApellido("");
    setFechaNacimiento("");
    setUsuario("");
    setContraseña("");
    fetchUsers();
  };

  // Eliminar usuario
  const deleteUser = async (idUsuario) => {
    await fetch(`${endpoints.eliminarUsuario}/?idUsuario=${idUsuario}`, { method: "DELETE" });
    fetchUsers();
  };

  // Editar usuario
  const editUser = async (idUsuario) => {
    const res = await fetch(`${endpoints.obtenerUsuario}/?idUsuario=${idUsuario}`);
    const data = await res.json();
    setEditedUser(data);
  }

  // Función que se ejecutará cuando después de que se edite un usuario
  const callBackEditUser = async (idUsuario, nombre, apellido, fechaNacimiento, usuario, contraseña) => {
    console.log(idUsuario, nombre, apellido, fechaNacimiento, usuario, contraseña)
    const res = await fetch(endpoints.editarUsuario, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idUsuario,
        nombre,
        apellido,
        fecha_nacimiento: fechaNacimiento,
        contraseña,
      }),
    });
    const resJSON = await res.json()
    if (!res.ok) {
      setError({ message: "Error al editar usuario", serverError: resJSON.error === undefined ? res.statusText : resJSON.error });
    }
    setEditedUser(null);
    fetchUsers();
  }

  // Componente de error que se mostrará cuando exista un error
  const errorComponent = (error) => {
    return (
      <>
        <script defer src="
https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js
"></script>
        <link href="
https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css
" rel="stylesheet"></link>
        <div className="container mt-5 p-4 border rounded shadow-lg bg-light text-center" style={{ maxWidth: "500px" }}>
          <h2 className="text-danger fw-bold">
            🚨 ¡Oh no! Algo salió mal... 😿
          </h2>

          <div className="alert alert-warning mt-3">
            <p className="mb-1"><strong>🔴 Error:</strong> {error.message}</p>
            <p className="mb-0"><strong>⚠️ Servidor:</strong> {error.serverError}</p>
          </div>

          <button className="btn btn-primary mt-3 fw-bold px-4 py-2 rounded-pill" onClick={() => window.location.reload()}>
            🔄 Refrescar Página
          </button>

          <p className="mt-3 text-muted small">
            🌸 Si el problema persiste, por favor inténtalo más tarde 🌸
          </p>
        </div>

      </>
    );
  }

  // Consultar estadísticas
  const consultarEstadisticas = async (idUsuario) => {
    setErrorEstadistica({ message: null, error: false });
    setEstadisticas(null);
    const res = await fetch(`${endpoints.consultarEstadisticas}/?idUsuario=${idUsuario}`);
    const data = await res.json();
    if (!res.ok) {
      setErrorEstadistica({ message: data.error, error: true });
      return;
    }
    setEstadisticas(data);
  }

  // Función que se ejecutará después de darle al botón de cerrar estadísticas
  const cerrarEstadisticaCb = () => {
    setErrorEstadistica({ message: null, error: false });
    setEstadisticas(null);
  }

  // Si hay un error, se muestra el componente de error
  if (error.message !== null) {
    return errorComponent(error);
  }

  return (
    <>
      <script defer src="
https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js
"></script>
      <link href="
https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css
" rel="stylesheet"></link>
      <div className="container mt-4">
        <h1 className="text-center mb-4">Gestión de Usuarios</h1>

        {/* Formulario de ingreso */}
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <input
              type="date"
              className="form-control"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <input
              type="password"
              className="form-control"
              placeholder="Contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
            />
          </div>
          <div className="col-12 text-center">
            <button className="btn btn-primary w-50" onClick={addUser}>
              Agregar Usuario
            </button>
          </div>
        </div>

        {/* Lista de usuarios */}
        <ul className="list-group">
          {users.map((user) => (
            <li key={user.idUsuario} className="list-group-item d-flex justify-content-between align-items-center">
              <span>
                {user.nombre} {user.apellido} - {user.fecha_nacimiento} - {user.usuario}
              </span>
              <div>
                <button className="btn btn-danger btn-sm me-2" onClick={() => deleteUser(user.idUsuario)}>
                  Eliminar
                </button>
                <button className="btn btn-warning btn-sm me-2" onClick={() => editUser(user.idUsuario)}>
                  Editar
                </button>
                <button className="btn btn-info btn-sm" onClick={() => consultarEstadisticas(user.idUsuario)}>
                  Consultar Estadísticas
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Formulario de edición */}
        <div className="mt-3">
          {editedUser !== null && (
            <EditUserForm user={editedUser} cb={callBackEditUser} cerrarCb={() => setEditedUser(null)} />
          )}
        </div>

        {/* Estadísticas */}
        <div className="mt-3 text-center">
          {errorEstadistica.error && <h2 className="text-danger">{errorEstadistica.message}</h2>}
          {estadisticas !== null && (
            <EstadisticasUsuario
              valorMaximo={estadisticas.valorMaximo}
              valorMedio={estadisticas.valorMedio}
              valorMinimo={estadisticas.valorMinimo}
              cerrarEstadisticaCb={cerrarEstadisticaCb}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
