import { map } from 'rxjs/operators/map';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import { _throw } from 'rxjs/observable/throw';
import { catchError, mergeMap, finalize } from 'rxjs/operators';

import { Storage } from '@ionic/storage';
import { AlertController, LoadingController } from "ionic-angular";
//const BASE_URL = "https://localhost:44310/";
const BASE_URL = "http://pocef.azurewebsites.net/";
const erros: any = {
  401: "Não autorizado.",
  400: "Requisição inválida.",
  403: "Acesso proíbido.",
  404: "Página não encontrada",
  408: "Tempo de requisição esgotou.",
  500: "Ocorreu um erro no servidor"
};
@Injectable()
export class APIInterceptor implements HttpInterceptor {

  private base_url: string;
  constructor(private alertCtrl: AlertController) {

    this.base_url = BASE_URL;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = `${this.base_url}/${request.url}`;

    return next.handle(request.clone({
      url: url,
      setHeaders: {
        Accept: `application/json`,
        'Content-Type': `application/json`
      }
    }))
      .pipe(catchError(this.catchErrors()));
  }

  private catchErrors() {
    return (response: Response) => {

      var errorMsg = "Ocorreu um erro inesperado";

      var msgError = erros[response.status];
      if (msgError) errorMsg = msgError;

      const result = (response as any);
      if (result.error && result.error.errors) {
        for (let error of result.error.errors) {
          this.alert(error);
        }
      }
      else {
        this.alert(errorMsg);
      }

      return Observable.throw(response);
    };
  }

  private alert(message) {
    let alert = this.alertCtrl.create({
      title: "BBbyC",
      message: message,
      buttons: ['OK']
    });
    alert.present();
  }
}