import { filter, map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs/Rx';
import * as jwt_decode from "jwt-decode";
import { Storage } from '@ionic/storage';
import { Injectable } from "@angular/core";

import { User } from './../models';
import { Identity } from './../class';
import { WebRequestService } from './web-request.service';



@Injectable()
export class AuthService {
  private isAuthorizedTimeout: any;
  private isAuthorized = new Subject<boolean>();
  constructor(private webRequest: WebRequestService, private storage: Storage) {

  }

  handleToken(response): boolean {
    const json = response;

    if (json.success && json.data.Authenticated) {
      this.storage.set("identity", JSON.stringify(json.data));
    }
    return json.data;
  }

  refreshAccessToken(refreshToken): Observable<any> {

    return this.webRequest.post(`/api/v1/account/refresh_token`, `"${refreshToken}"`)
      .map(response => this.handleToken(response));
  }

  login(user: User): Observable<any> {

    return this.webRequest.post(`/api/v1/account/token`, user)
      .map(response => this.handleToken(response));
  }

  logout(): void {
    console.log("start logoff");
    this.storage.remove("identity")
      .then(data => this.isAuthorized.next(false));

  }

  getIdentity(): Promise<Identity> {
    const getIdentity = Observable.from(this.storage.get("identity"));
    return getIdentity
      .pipe(
      map(identity => {

        if (identity) {
          const obj = JSON.parse(identity);
          return new Identity(obj.Authenticated, obj.Created, obj.Expiration, obj.AccessToken, obj.RefreshToken, obj.Message);
        }

        return new Identity();
      })).toPromise();
  }

}