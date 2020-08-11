import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ranking } from "../models";
import 'rxjs/add/observable/of';
import * as moment from 'moment';
import { WebRequestService } from "./web-request.service";
import { ResgatePontuacao } from "../models/resgate-pontuacao";
const PONTUACAO_URL = 'mobile/api/v1/Pontuacao/';

@Injectable()
export class PontuacaoService {


    constructor(private webRequest: WebRequestService) {

    }

    get(): Observable<number> {

        return this.webRequest.get(`${PONTUACAO_URL}/Get`, {}, { ajaxLoading: false })
            .pipe(map(response => response.data));
    }

    resgatar(resgate: ResgatePontuacao) {

        return this.webRequest.post(`${PONTUACAO_URL}/Rescue`, resgate);
    }


}