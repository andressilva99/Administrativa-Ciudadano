import { stationService } from "../service/station.service";

export class DeleteStationUseCase {
  public async execute(id: number): Promise<void> {
    try {
      await stationService.deleteStation(id);
    } catch (error) {
      console.error('Error deleting penalty type:', error);
      throw error;
    }
  }
}

export const deleteStationUseCase = new DeleteStationUseCase();