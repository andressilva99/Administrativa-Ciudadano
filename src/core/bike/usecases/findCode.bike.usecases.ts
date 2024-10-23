import { BikeService, bikeService } from "../service/bike.service";
import { IBike } from '../../entities/bike/IBike';

export class FindByCodeBikeUseCase {
  private _service: BikeService;

  constructor() {
    this._service = bikeService;
  }

  public async execute(identificationCode: string): Promise<IBike> {
    return await this._service.findByCode(identificationCode);
  }
}

export const findByCodeBikeUseCase = new FindByCodeBikeUseCase();
