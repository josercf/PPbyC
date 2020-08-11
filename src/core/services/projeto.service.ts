import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import * as moment from 'moment';
import { WebRequestService } from "./web-request.service";
import { Projeto } from '../models/projeto';
const projetos_url = 'mobile/api/v1/projeto/';
@Injectable()
export class ProjetoService {


    constructor(private webRequest: WebRequestService) {
    }

    listar(): Observable<Projeto[]> {

        return this.webRequest.get(`${projetos_url}/listar/`, {}, { ajaxLoading: false })
            .pipe(map(response => response.data));
    }

    // obterRealizados(qtd): Observable<Evento[]> {

    //     return this.webRequest.get(`${eventos_url}/ObterRealizados/${qtd}`, {}, { ajaxLoading: false })
    //         .pipe(map(response => response.data));
    // }

   getById(id): Observable<Projeto> {

        return this.webRequest.get(`${projetos_url}/GetById/${id}`, {}, { ajaxLoading: false })
            .pipe(map(response => response.data));
    }

}