// src/services/api.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8053/adm-main';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN', // Reemplaza YOUR_TOKEN con el token real
  },
});

// Función para obtener módulos
export const findModules = (page: number = 0, size: number = 10) => {
  return axiosInstance.get('/module/find', { params: { page, size } });
};

// Función para obtener un módulo por ID
export const getById = (id: number) => {
  return axiosInstance.get(`/module/${id}`);
};

// Función para obtener un módulo por código
export const getByCode = (code: string) => {
  return axiosInstance.get(`/module/code/${code}`);
};

// Función para editar un módulo
export const putEdit = (moduleData: { moduleId: number, enabledNp: boolean, enabledLp: boolean, minNpLevel: number, minLpLevel: number }) => {
  return axiosInstance.put('/module/edit', moduleData);
};
