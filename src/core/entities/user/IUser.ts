export interface IUser {
  list: any;
  admUser: any;
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

//ById
export interface ByIdUser {
  id: number;
}

//add user
export interface IUserAdd {
  firstName: string;
  lastName: string;
  dni: string;
  email: string;
  phoneNumber?: string;
  enabled: boolean;
  password: string;
}

//edit user
export interface EUser {
  admUser: any;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  enabled: boolean;
}

export interface IPermissionItem {
  name: string;
  description: string;
  checked?: boolean;
}
