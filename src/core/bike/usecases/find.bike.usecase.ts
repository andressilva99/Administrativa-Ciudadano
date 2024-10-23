import { bikeService, BikeService } from '../service/bike.service';

export class FindBikesUseCase {
  private _service: BikeService;

  constructor() {
    this._service = bikeService;
  }

  public async execute(size: number, page: number) {
    return await this._service.getByPage(size, page );
  }
}

export const findBikesUseCase = new FindBikesUseCase();
