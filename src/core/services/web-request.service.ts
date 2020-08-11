import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';
import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ServerResponse } from "../class/server.response";
import { LoadingService } from "./loading.service";

export interface SettingAjaxLoader {
  ajaxLoading: boolean;
}

export interface SettingAuth {
  authorization: boolean;
}

export interface SettingError {
  showErrors: boolean;
}

@Injectable()
export class WebRequestService {
  requests: string[] = [];
  settings: SettingAjaxLoader | SettingAuth | SettingError = {
    authorization: true,
    ajaxLoading: true,
    showErrors: true
  };

  constructor(
    private http: HttpClient,
    public loadingService: LoadingService
  ) { }

  private getOptionsForRequest(
    options: any,
    settings?: SettingAjaxLoader | SettingAuth | SettingError
  ): {
      headers?: HttpHeaders | {
        [header: string]: string | string[];
      };
      observe?: 'body';
      params?: HttpParams | {
        [param: string]: string | string[];
      };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;

    } {
    let optionsSetting = Object.assign(
      {},
      this.settings,
      settings || {}
    ) as any;

    let headers = new HttpHeaders();

    if (options) {
      for (let key of Object.keys(options).map(function (key) {
        return key;
      })) {
        headers.delete(key);
        headers.append(key, options[key]);
      }
    }


    return { headers: headers, responseType: 'json', observe: 'body' };
  }

  post(
    url: string,
    data: any,
    options?: any,
    settings?: SettingAjaxLoader | SettingAuth | SettingError
  ): Observable<ServerResponse> {
    if (!this.onLine()) {
      return this.offlineMessage()
    }

    this.startLoad(url, settings);
    return this.http
      .post(
      url,
      data,
      this.getOptionsForRequest(settings))
      .finally(() => {
        this.stopLoad(url);
      });
  }

  put(
    url: string,
    data: any,
    options?: any,
    settings?: SettingAjaxLoader | SettingAuth | SettingError
  ): Observable<ServerResponse> {
    if (!this.onLine()) {
      return this.offlineMessage()
    }

    this.startLoad(url, settings);

    return this.http
      .put(
      url,
      data,
      this.getOptionsForRequest(options, settings)
      ).finally(() => {
        this.stopLoad(url);
      });
  }

  get(
    url: string,
    options?: any,
    settings?: SettingAjaxLoader | SettingAuth | SettingError
  ): Observable<ServerResponse> {
    if (!this.onLine()) {
      return this.offlineMessage()
    }

    this.startLoad(url, settings);

    return this.http
      .get(url, this.getOptionsForRequest(options, settings))
      .finally(() => {
        this.stopLoad(url);
      });

  }

  public onLine(): boolean {
    return navigator.onLine;
  }

  startLoad(
    url: string,
    settings?: SettingAjaxLoader | SettingAuth | SettingError
  ) {
    let loadSetting = Object.assign({}, this.settings, settings || {}) as any;

    if (!loadSetting.ajaxLoading) return;

    const length = this.requests ? this.requests.length : 0;

    if (length === 0) {
      this.loadingService.presentWithGif();
      this.requests.push(url);
    }
  }

  stopLoad(url: string) {
    var index = this.requests.indexOf(url);
    if (index > -1) {
      this.requests.splice(index, 1);
    }

    if (this.requests && this.requests.length === 0) {
      this.loadingService.dismiss();
    }
  }

  offlineMessage(): Observable<ServerResponse> {

    return Observable.of({
      success: false,
      data: null,
      errors: ["Navegador offline."]
    }).map(o => o);

  }
}