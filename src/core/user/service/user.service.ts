import { ApiService } from '../../../services/api.service';
import { IUser, UserResponse } from '../../entities/user/IUser';

export class UserService extends ApiService {
  private _uri: string = '/adm-main/admuser';

  public async getByPage(
    prop: string,
    search: string,
    size: number,
    page: number,
  ): Promise<UserResponse> {
    try {
      const response = await this.get<UserResponse>(
        `${this._uri}/find?${prop}=${search}&size=${size}&page=${page}`,
      );

      return response.data;
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  }

  public async findById(id: number): Promise<IUser> {
    try {
      const response = await this.get<IUser>(`${this._uri}/${id}`);

      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export const userService = new UserService();
