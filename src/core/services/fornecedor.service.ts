import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import * as moment from 'moment';
import { WebRequestService } from "./web-request.service";
import { Fornecedor } from "../models/fornecedor";
const FORNECEDOR_URL = 'mobile/api/v1/fornecedor/';

@Injectable()
export class FornecedorService {


    constructor(private webRequest: WebRequestService) {
    }

    getAllActive(): Observable<Fornecedor[]> {

        return this.webRequest.get(`${FORNECEDOR_URL}/GetAllActive`, {}, { ajaxLoading: false })
            .pipe(map(response => response.data));
    }


}