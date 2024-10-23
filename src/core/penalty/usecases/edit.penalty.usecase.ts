import { penaltyService, PenaltyService } from '../service/penalty.service';
import { IPenaltyEdit } from '../../entities/penalty/IPentalty';

export class EditPenaltyUseCase {
  private _service: PenaltyService;

  constructor() {
    this._service = penaltyService;
  }

  public async execute(penaltyData: IPenaltyEdit): Promise<IPenaltyEdit> {
    try {
      const response = await this._service.editPenalty(penaltyData);
      console.log(response);
      return response;
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  }
}

export const editPenaltyUseCase = new EditPenaltyUseCase();
