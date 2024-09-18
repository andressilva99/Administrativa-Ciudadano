import { Permission } from './Permission';

export interface IRole {
  id: number;
  name: string;
  description: string;
  idModule: number;
  permissionsList: PermissionItem[]; 
  fixed: boolean;
  enabled: boolean;
  deleted: boolean;
  tsi: string;
  tsu: string;
}

export interface PermissionItem {  
  name: Permission;
  description: string;
  checked?: boolean; 
}

//ADD ROLE
export interface IRoleAdd {
  idModule: number,
  name: string,
  description: string,
  permissionsList: string[];
}

//EDIT ROLE 
export interface ERole {
  id: number | null;
  name: string;
  description: string;
  idModule: number | null;
  permissionsList: EPermissionItem[]; 
  fixed: boolean;
  enabled: boolean;
  deleted: boolean;
  tsi: string;
  tsu: string;
}

export interface EPermissionItem {  
  name: Permission; 
  description: string;
  checked?: boolean; 
}