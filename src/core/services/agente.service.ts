import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import * as moment from 'moment';
import { WebRequestService } from "./web-request.service";
import { Competencia } from '../models/competencia';
import { AgenteAvaliacao } from '../models/agente-avaliacao';
const competencias_url = 'mobile/api/v1/agente/';
@Injectable()
export class AgenteService {


    constructor(private webRequest: WebRequestService) {
    }

    listar(): Observable<Competencia[]> {

        return this.webRequest.get(`${competencias_url}/listar`, {}, { ajaxLoading: false })
            .pipe(map(response => response.data));
    }


    getById(id): Observable<Competencia> {

        return this.webRequest.get(`${competencias_url}/GetById/${id}`, {}, { ajaxLoading: false })
            .pipe(map(response => response.data));
    }

    avaliar(avaliaco: AgenteAvaliacao[]) {

        return this.webRequest.post(`${competencias_url}/avaliar`, avaliaco, {}, { ajaxLoading: true })
            .pipe(map(response => response));

    }

    consultarAvaliacao(idUsuario: string, idAbordagem: string, idAgente: string) {
        return this.webRequest.get(`${competencias_url}/BuscarAvaliacao?idUsuario=${idUsuario}&idAbordagem=${idAbordagem}&idAgente=${idAgente}`, {}, { ajaxLoading: false })
            .pipe(map(response => response.data));
    }

}