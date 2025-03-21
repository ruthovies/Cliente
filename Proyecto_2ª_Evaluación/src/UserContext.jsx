// src/UserContext.js
import React, { createContext } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  //El nombre de usuario debe tener al menos 6 caracteres, solo letras minúsculas y números, y comenzar con letra.
  const usernameRegex = /^[a-z][a-z0-9]{5,}$/;
  //La contraseña debe tener al menos 8 caracteres, contener al menos una letra mayúscula y un número.
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  
  return (
    <UserContext.Provider value={{ usernameRegex, passwordRegex }}>
      {children}
    </UserContext.Provider>
  );
};
