import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import * as moment from 'moment';
import { WebRequestService } from "./web-request.service";
import { Competencia } from '../models/competencia';
import { Metodologia } from '../models/metodologia';
const metodologias_url = 'mobile/api/v1/metodologia/';
@Injectable()
export class MetodologiaService {


    constructor(private webRequest: WebRequestService) {
    }

    listar(): Observable<Metodologia[]> {

        return this.webRequest.get(`${metodologias_url}/listar/`, {}, { ajaxLoading: false })
            .pipe(map(response => response.data));
    }

   getById(id): Observable<Metodologia> {

        return this.webRequest.get(`${metodologias_url}/GetById/${id}`, {}, { ajaxLoading: false })
            .pipe(map(response => response.data));
    }
}