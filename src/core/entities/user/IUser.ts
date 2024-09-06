export interface IUser {
  tsi: string;
  tsu: string;
  id: number;
  firstName: string;
  lastName: string;
  dni: string;
  email: string;
  phoneNumber: string;
  lastAccessDate: string;
  fixed: boolean;
  enabled: boolean;
  deleted: boolean;
  configuraciones: {
    lastPasswordChange: string | null;
  };
  root: boolean;
}
export interface UserResponse {
  list: IUser[];
  total: number;
  size: number;
}