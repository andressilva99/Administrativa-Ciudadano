import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export class ApiService {
  private _baseUrl: string = import.meta.env.VITE_API_BASE_URL;
  private readonly _instance: AxiosInstance;

  constructor() {
    this._instance = axios.create({
      baseURL: this._baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: false,
    });

    this._instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = window.localStorage.getItem('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this._instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const newToken = response.data?.access_token;
        if (newToken) {
          window.localStorage.setItem('access_token', newToken);
        }
        return response;
      },
      (error) => {
        if (error.response?.status === 401) {
          window.location.href = '/auth/login';
        }
        return Promise.reject(error);
      }
    )
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return await this._instance.get<T>(url, config);
  }

  async post<T = any, R = any>(
    url: string,
    data: R,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return await this._instance.post<T>(url, data, config);
  }

  async put<T = any, R = any>(
    url: string,
    data: R,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return await this._instance.put<T>(url, data, config);
  }

  async delete<T= any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return await this._instance.delete<T>(url, config)
  }
}
