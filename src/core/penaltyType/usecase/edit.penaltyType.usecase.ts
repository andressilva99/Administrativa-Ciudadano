import { penaltyTypeService, PenaltyTypeService } from '../service/penaltyType.service';
import { IPenaltyTypeEdit } from '../../entities/penaltyType/IPenaltyType';

export class EditPenaltyTypeUseCase {
  private _service: PenaltyTypeService;

  constructor() {
    this._service = penaltyTypeService;
  }

  public async execute(penaltyTypeData: IPenaltyTypeEdit): Promise<IPenaltyTypeEdit> {
    try {
      const response = await this._service.editPenaltyType(penaltyTypeData);
      console.log(response);
      return response;
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  }
}

export const editPenaltyTypeUseCase = new EditPenaltyTypeUseCase();
