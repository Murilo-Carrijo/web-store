import { jwtDecode } from 'jwt-decode';

export const decodeToken = (token) => {
  console.log('Token:', token);

  try {
    const decoded = jwtDecode(token);
    console.log("Payload decodificado:", decoded);
    return decoded;
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
  }
};