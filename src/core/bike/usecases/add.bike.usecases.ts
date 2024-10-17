import { bikeService, BikeService } from '../service/bike.service';
import { ABike } from '../../entities/bike/IBike';

export class AddBikeUseCase {
  private _service: BikeService;

  constructor() {
    this._service = bikeService;
  }

  public async execute(bikeData: ABike): Promise<ABike> {
    try {
      const response = await this._service.addBike(bikeData);
      console.log(response);
      return response;
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  }
}

export const addBikeUseCase = new AddBikeUseCase();
