import { useState, useEffect } from 'react';

export default function EditUserForm({ user, cb, cerrarCb }) {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [usuario, setUsuario] = useState("");
    const [contraseña, setContraseña] = useState("");

    useEffect(() => {
        setNombre(user.nombre);
        setApellido(user.apellido);
        setFechaNacimiento(user.fecha_nacimiento);
        setUsuario(user.usuario);
    }, [user])

    return (
        <div className="container mt-4 p-4 border rounded shadow bg-light">
            {/* Botón para cerrar */}
            <div className="text-end">
                <button className="btn btn-secondary" onClick={() => cerrarCb()}>
                    Cerrar
                </button>
            </div>

            {/* Título */}
            <h2 className="text-center mb-4">Editar Usuario</h2>

            {/* Formulario */}
            <div className="row g-3">
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
                        disabled
                        onChange={(e) => setUsuario(e.target.value)}
                    />
                </div>
                <div className="col-md-12">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Contraseña"
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                    />
                </div>
                <div className="col-12 text-center">
                    <button
                        className="btn btn-primary w-50"
                        onClick={() => cb(user.idUsuario, nombre, apellido, fechaNacimiento, user.usuario, contraseña)}
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </div>

    )
}