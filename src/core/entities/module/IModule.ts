export interface IModule {
    id: number;
    code: string;
    name: string;
    description: string;
    enableNp: boolean;
    enableLp: boolean;
    minNpLevel: number;
    minLpLevel: number;
}