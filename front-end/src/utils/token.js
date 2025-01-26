import { jwtDecode } from 'jwt-decode';

export const decodeToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
  }
};