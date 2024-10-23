import { userService, UserService } from '../service/user.service';

export class GetAllUserUseCase {
  private _service: UserService;

  constructor() {
    this._service = userService;
  }

  public async execute(property: string, search: string, size: number, page: number) {
    return await this._service.getByPage(property, search, size, page);
  }
}

export const getAllUserUseCase = new GetAllUserUseCase();