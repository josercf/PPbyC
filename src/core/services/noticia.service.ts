import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Noticia } from "../models";
import 'rxjs/add/observable/of';
import * as moment from 'moment';
import { WebRequestService } from "./web-request.service";
const NOTICIA_URL = 'mobile/api/v1/noticia/';
@Injectable()
export class NoticiaService {


    constructor(private webRequest: WebRequestService) {
    }

    getList(quantidade): Observable<Noticia[]> {

        return this.webRequest.get(`${NOTICIA_URL}/GetList/${quantidade}`, {}, { ajaxLoading: false })
            .pipe(map(response => response.data));
    }

    getById(id): Observable<Noticia> {

        return this.webRequest.get(`${NOTICIA_URL}/GetById/${id}`, {}, { ajaxLoading: false })
            .pipe(map(response => response.data));
    }

}