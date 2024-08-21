import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export class ApiService {
  private _baseUrl: string = import.meta.env.VITE_API_BASE_URL;
  private _instance: AxiosInstance;
  private _tokenAPI: string = localStorage.getItem('access_token')!

  constructor() {
    this._instance = axios.create({
      baseURL: this._baseUrl,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this._tokenAPI}`
      },
      withCredentials: false,
    });
  }

  async post<T, R = any>(
    url: string,
    data: R,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return await this._instance.post<T>(url, data, config);
  }

  async get<T = any>(url: string): Promise<AxiosResponse<T>> {
    return await this._instance.get<T>(url);
  }
}
