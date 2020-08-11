import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import * as moment from 'moment';
import { WebRequestService } from "./web-request.service";
import { Competencia } from '../models/competencia';
const competencias_url = 'mobile/api/v1/competencia/';
@Injectable()
export class CompetenciaService {


    constructor(private webRequest: WebRequestService) {
    }

    listar(): Observable<Competencia[]> {

        return this.webRequest.get(`${competencias_url}/listar/`, {}, { ajaxLoading: false })
            .pipe(map(response => response.data));
    }

    // obterRealizados(qtd): Observable<Evento[]> {

    //     return this.webRequest.get(`${eventos_url}/ObterRealizados/${qtd}`, {}, { ajaxLoading: false })
    //         .pipe(map(response => response.data));
    // }

   getById(id): Observable<Competencia> {

        return this.webRequest.get(`${competencias_url}/GetById/${id}`, {}, { ajaxLoading: false })
            .pipe(map(response => response.data));
    }

}