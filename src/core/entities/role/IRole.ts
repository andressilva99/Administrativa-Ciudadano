import { Permission } from './Permission';

export interface IRole {
  id: number;
  name: string;
  description: string;
  moduleCode: string;
  permissionsList: Permission[];
}
