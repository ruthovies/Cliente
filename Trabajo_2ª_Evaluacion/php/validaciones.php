<?php
    function validarUsuario($usuario) {
        return preg_match('/^[a-z][a-z0-9]{5,}$/', $usuario);
    }

    function validarPasswd($contraseña) {
        return preg_match('/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W]{8,}$/', $contraseña);
    }

    function validarUsuarioAñadir($usuario, $contraseña, $fecha_nacimiento){
        if (!validarUsuario($usuario)){
            return "El usuario no puede contener caracteres especiales ni empezar por un número";
        }
        if (!validarPasswd($contraseña)) {
            return "La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula y un número";
        }
        if (!comprobarMayorEdad($fecha_nacimiento)){
            return "El usuario tiene que ser mayor de edad";
        }
        return true;
    }

    function validarUsuarioEditar($contraseña, $fecha_nacimiento){
        if (!validarPasswd($contraseña)) {
            return "La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula y un número";
        }
        if (!comprobarMayorEdad($fecha_nacimiento)){
            return "El usuario tiene que ser mayor de edad";
        }
        return true;
    }

    function comprobarMayorEdad($fecha_nacimiento){
        $fecha = new DateTime($fecha_nacimiento);
        $hoy = new DateTime();
        $edad = $hoy->diff($fecha);
        return $edad->y >= 18;
    }

?>