import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Evento } from "../models";
import 'rxjs/add/observable/of';
import * as moment from 'moment';
import { WebRequestService } from "./web-request.service";
const eventos_url = 'mobile/api/v1/evento/';
@Injectable()
export class EventoService {


    constructor(private webRequest: WebRequestService) {
    }

    obterProximos(qtd): Observable<Evento[]> {

        return this.webRequest.get(`${eventos_url}/ObterProximos/${qtd}`, {}, { ajaxLoading: false })
            .pipe(map(response => response.data));
    }

    obterRealizados(qtd): Observable<Evento[]> {

        return this.webRequest.get(`${eventos_url}/ObterRealizados/${qtd}`, {}, { ajaxLoading: false })
            .pipe(map(response => response.data));
    }

   getById(id): Observable<Evento> {

        return this.webRequest.get(`${eventos_url}/GetById/${id}`, {}, { ajaxLoading: false })
            .pipe(map(response => response.data));
    }

}