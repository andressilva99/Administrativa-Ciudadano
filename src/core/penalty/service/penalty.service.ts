import { ApiService } from "../../../services/api.service";
import { PenaltyResponse } from "../../entities/penalty/IPentalty";

export class PenaltyService extends ApiService {
    private _uri: string = '/adm-bicis/penalty';

    public async getByPage(
        prop: string,
        search: string,
        size: number,
        page: number,
        issuedDateFrom: string,
        issuedDateTo: string,
    ): Promise<PenaltyResponse>{
        try {
            const response = await this.get<PenaltyResponse>(
                `${this._uri}/find?${prop}=${search}&size=${size}&page=${page}&issuedDateFrom=${issuedDateFrom}&issuedDateTo=${issuedDateTo}`
            );
            
            return response.data;
        } catch (err: any) {
            console.error(err);
            throw err;
        }
    }
}

export const penaltyService = new PenaltyService()