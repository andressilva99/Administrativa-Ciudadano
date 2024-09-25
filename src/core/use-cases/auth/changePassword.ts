import { IAuthRepository } from "../../interfaces/IAuthRepository";
import { IPasswordChange } from "../../entities/auth/IAuth";

export class ChangePassword {
    private _repository: IAuthRepository;

    constructor(repository: IAuthRepository) {
        this._repository = repository;
    }

    async changePw(passwordData: IPasswordChange): Promise<void> {
        try {
            await this._repository.changePw(passwordData);
            console.log('Contraseña cambiada correctamente');
        } catch (err) {
            console.error('Error al cambiar la contraseña', err);
            throw new Error('No se pudo cambiar la contraseña');
        }
    }
}