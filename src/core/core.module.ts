import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { APIInterceptor } from "./interceptors/api-interceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { RefreshTokenInterceptor } from "./interceptors/refresh-token.interceptor";
import { WebRequestService } from "./services/web-request.service";
import { AuthService } from "./services/auth.service";
import { RefreshService } from "./services/refresh-service";
import { LoadingService } from "./services/loading.service";



@NgModule({
    declarations: [

    ],
    imports: [
    ],
    exports: [
    ],
    entryComponents: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: APIInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RefreshTokenInterceptor,
            multi: true,
        },
        AuthService,
        WebRequestService,
        RefreshService,
        LoadingService
    ]
})
export class CoreModule { }