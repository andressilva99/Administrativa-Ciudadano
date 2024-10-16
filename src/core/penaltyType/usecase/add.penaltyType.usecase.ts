import { penaltyTypeService, PenaltyTypeService } from '../service/penaltyType.service';
import { IPenaltyTypeAdd } from '../../entities/penaltyType/IPenaltyType';

export class AddPenaltyTypeUseCase {
  private _service: PenaltyTypeService;

  constructor() {
    this._service = penaltyTypeService;
  }

  public async execute(penaltyTypeData: IPenaltyTypeAdd): Promise<IPenaltyTypeAdd> {
    try {
      const response = await this._service.addPenaltyType(penaltyTypeData);
      console.log(response);
      return response;
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  }
}

export const addPenaltyTypeUseCase = new AddPenaltyTypeUseCase();
