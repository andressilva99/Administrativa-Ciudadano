import { IAuthRepository } from "../../interfaces/IAuthRepository";
import { IPasswordRecovery } from "../../entities/auth/IAuth";

export class RecoverPassword {
    private _repository: IAuthRepository;

    constructor(repository: IAuthRepository) {
        this._repository = repository;
    }

    async recoveredPw(passwordRecovered: IPasswordRecovery): Promise<void> {
        try {
            await this._repository.recoveredPw(passwordRecovered);
            console.log('Correo de recuperación enviado');
        } catch (err) {
            console.error('Error en la recuperación de contraseña: ', err);
            throw new Error('Error al intentar recuperar la contraseña');
        }
    }
}