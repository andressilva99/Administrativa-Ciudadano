//Find
export interface IModule {
    id: number;
    code: string;
    name: string;
    description: string;
    enableNp: boolean;
    enableLp: boolean;
    minNpLevel: number;
    minLpLevel: number;
    configuraciones: {
        empty: boolean;
      };
}
//Edit
export interface EditModuleProps {
    moduleId: number;
  onCancel: () => void;
}
export interface EModule {
    moduleId: number;
    enabledNp: boolean;
    enabledLp: boolean;
    minNpLevel: number;
    minLpLevel: number;
}
//ById
export interface ByIdModule {
    id: number;
  code: string;
  moduleType: string;
  name: string;
  enabledNp: boolean;
  enabledLp: boolean;
  minNpLevel: number;
  minLpLevel: number;
  configuraciones: {
    empty: boolean;
  };
}
export interface ModuleByIdProps {
    id: number;
}
//ByCode
export interface ByCodeModule {
    id: number;
    code: string;
    moduleType: string;
    name: string;
    enabledNp: boolean;
    enabledLp: boolean;
    minNpLevel: number;
    minLpLevel: number;
    configuraciones: {
      empty: boolean;
    };
}
export interface ModuleDetailProps {
    code: string;
}
//ADD 