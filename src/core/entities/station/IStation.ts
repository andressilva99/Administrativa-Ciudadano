export interface IStation {
    id: number; 
    name: string; 
    address: string; 
    enabled: boolean; 
    horarioString: string; 
    tsi: string; 
    tsu: string; 
}
export interface StationResponse {
    list: IStation[];
    total: number;
    size: number;
  }
