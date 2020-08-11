import { ServerResponse } from './../class/server.response';
import { User } from './../models/user';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import * as moment from 'moment';
import { WebRequestService } from "./web-request.service";
const ACCOUNT_URL = 'api/v1/account/';

@Injectable()
export class AccountService {


    constructor(private webRequest: WebRequestService) {
    }

    register(user: User): Observable<ServerResponse> {

        return this.webRequest.post(`${ACCOUNT_URL}/register`, user);
    }

}