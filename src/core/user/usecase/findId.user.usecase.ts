import { userService, UserService } from '../service/user.service';
import { IUser } from '../../entities/user/IUser';

export class FindByIdUserUseCase {
  private _service: UserService;

  constructor() {
    this._service = userService;
  }

  public async execute(id: number): Promise<IUser> {
    return await this._service.findById(id);
  }
}

export const findByIdUserUseCase = new FindByIdUserUseCase();