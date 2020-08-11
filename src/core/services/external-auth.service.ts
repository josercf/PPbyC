import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import * as moment from 'moment';

import { Evento } from "../models";
import { WebRequestService } from "./web-request.service";
const EXTERNAL_AUTH_URL = 'mobile/api/v1/ExternalAuth/';

@Injectable()
export class ExternalAuthService {


    constructor(private webRequest: WebRequestService) {

    }

    facebook(token): Observable<any> {

        return this.webRequest.get(`${EXTERNAL_AUTH_URL}/facebook/${token}`);
    }

}