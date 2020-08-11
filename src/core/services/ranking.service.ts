import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ranking } from "../models";
import 'rxjs/add/observable/of';
import * as moment from 'moment';
import { WebRequestService } from "./web-request.service";
const RANKING_URL = 'mobile/api/v1/Ranking/';

@Injectable()
export class RankingService {


    constructor(private webRequest: WebRequestService) {
    
    }

    getList(): Observable<Ranking[]> {

        return this.webRequest.get(`${RANKING_URL}/GetList`, {}, { ajaxLoading: false })
            .pipe(map(response => response.data));
    }


}