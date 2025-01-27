import { IModule, EModule, AModule } from "../entities/module/IModule";

export interface IModuleRepository {
    findModules(page: number, size: number): Promise<IModule[]>;
    findModulesByCode(code: string): Promise<IModule>;
    findModulesById(id: number): Promise<IModule>;
    editModule(module: EModule): Promise<void>;
    registerModule(module: AModule): Promise<any>;
}