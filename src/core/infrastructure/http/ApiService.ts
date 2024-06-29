import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export class ApiService {
  private _baseUrl: string = import.meta.env.VITE_API_BASE_URL;
  private _instance: AxiosInstance;

  constructor() {
    this._instance = axios.create({
      baseURL: this._baseUrl,
      headers: {
        'Content-Type': 'application/json',
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
}
