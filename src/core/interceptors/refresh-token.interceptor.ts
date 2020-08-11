import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { catchError, mergeMap, finalize, switchMap, filter, take } from 'rxjs/operators';
import { AuthService } from "../services/auth.service";
import { Identity } from "../class/identity";
import { App } from 'ionic-angular';
import { HomePage } from "../../pages/home/home";

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
    isRefreshingToken: boolean = false;
    tokenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    constructor(private auth: AuthService, private app: App) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return this.addAuthenticationToken(request, next);

    }

    handleErrors(error, request, next) {
        if (error instanceof HttpErrorResponse) {
            switch ((<HttpErrorResponse>error).status) {
                case 400:
                    return this.handle400Error(error);
                case 401:
                    return this.handle401Error(request, next, error);
                default:
                    return Observable.throw(error);
            }
        } else {
            return Observable.throw(error);
        }
    }

    handle400Error(error): Observable<any> {
        if (error && error.status === 400 && error.url.indexOf("refresh_token") > 0) {

            this.logout();
        }

        return Observable.throw(error);
    }

    handle401Error(request, next, error): Observable<any> {

        if (!this.isRefreshingToken) {
            this.isRefreshingToken = true;
            this.tokenSubject.next(false);

            const getIdentity = Observable.from(this.auth.getIdentity());

            return getIdentity
                .pipe(
                switchMap((identity: Identity) => {

                    return this.auth.refreshAccessToken(identity.RefreshToken)
                        .pipe(
                        switchMap((identity: any) => {
                            if (identity) {
                                this.tokenSubject.next(identity.Authenticated);
                                const accessToken = identity.AccessToken;
                                return this.setAccessToken(accessToken, request, next);

                            }
                            return Observable.throw(error);
                        }));
                }),
                catchError(error => {

                    return Observable.throw(error);
                }),
                finalize(() => {
                    this.isRefreshingToken = false;
                }));
        }

        return this.tokenSubject.pipe(
            filter(authenticated => authenticated),
            take(1),
            switchMap(token => {
                return this.addAuthenticationToken(request, next);
            }), );
    }

    addAuthenticationToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const getIdentity = Observable.from(this.auth.getIdentity());

        return getIdentity.pipe(
            switchMap((identity: Identity) => {
                return this.setAccessToken(identity.AccessToken, request, next);
            }));

    }

    setAccessToken(accessToken, request, next) {
        if (!accessToken) {
            return next.handle(request)
                .pipe(catchError(error => this.handleErrors(error, request, next)));
        }

        return next.handle(request.clone({
            setHeaders: {
                Authorization: `Bearer ${accessToken}`
            }
        })).pipe(catchError(error => this.handleErrors(error, request, next)));
    }

    logout() {

        this.auth.logout();

        this.app.getRootNav().setRoot(HomePage);

    }
}