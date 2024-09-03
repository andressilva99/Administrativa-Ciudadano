import { AuthRepository } from '../infrastructure/repository/AuthRepository';
import { Permission } from '../Permission';

export class AuthService {
  private _repository: AuthRepository;

  constructor() {
    this._repository = new AuthRepository();
  }

  async signin(email: string, password: string): Promise<any> {
    return await this._repository.signin(email, password);
  }

  //-----------------------------MODULOS-----------------------------------//
  async findModules(page: number, size: number): Promise<any> {
    return await this._repository.findModules(page, size);
  }

  //BUSCAR MODULO
  async findModulesByCode(code: string): Promise<any> {
    return await this._repository.findModulesByCode(code);
  }

  //BUSCAR MODULO POR ID
  async findModulesById(id: number): Promise<any> {
    return await this._repository.findModulesById(id);
  }

  //EDITAR MODULO
  async editModule(
    moduleId: number,
    enabledNp: boolean,
    enabledLp: boolean,
    minNpLevel: number,
    minLpLevel: number
  ): Promise<any> {
    return await this._repository.editModule(moduleId, enabledNp, enabledLp, minNpLevel, minLpLevel);
  }
  
  //------------------------------ROLES---------------------------------//
  async findRoles(moduleCode: string, page: number, size: number): Promise<any> {
    return await this._repository.findRoles(moduleCode, page, size);
  }

  //Buscar rol por id
  async findRoleById(id: number): Promise<any> {
    return await this._repository.findRoleById(id);
  }

  //Registrar Rol
  async registerRol(
    idModule: number,
    name: string,
    description: string,
    permissionsList: Permission[],
  ): Promise<any> {
    return await this._repository.registerRol(idModule, name, description, permissionsList);
  }
}
