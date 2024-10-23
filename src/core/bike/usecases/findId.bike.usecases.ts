import { BikeService, bikeService } from "../service/bike.service";
import { IBike } from '../../entities/bike/IBike';

export class FindByIdBikeUseCase {
  private _service: BikeService;

  constructor() {
    this._service = bikeService;
  }

  public async execute(id: number): Promise<IBike> {
    return await this._service.findById(id);
  }
}

export const findByIdBikeUseCase = new FindByIdBikeUseCase();
