import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';

import { WebRequestService } from "./web-request.service";
import { Variavel } from '../models/Variavel';
const competencias_url = 'mobile/api/v1/VariaveisLinguisticas/';

@Injectable()
export class VariavelService {


    constructor(private webRequest: WebRequestService) {
    }

    listar(): Observable<Variavel[]> {

        return this.webRequest.get(`${competencias_url}/listar`, {}, { ajaxLoading: false })
            .pipe(map(response => response.data));
    }



}