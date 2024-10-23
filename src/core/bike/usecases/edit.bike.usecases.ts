import { bikeService, BikeService } from "../service/bike.service";
import { EBike } from "../../entities/bike/IBike";

export class EditBikeUseCase {
  private _service: BikeService;

  constructor() {
    this._service = bikeService;
  }

  public async execute(bikeData: EBike): Promise<EBike> {
    try {
      const response = await this._service.editBike(bikeData);
      console.log(response);
      return response;
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  }
}

export const editBikeUseCase = new EditBikeUseCase();
