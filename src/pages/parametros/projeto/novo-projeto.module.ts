import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { SocialSharing } from '@ionic-native/social-sharing';
import { NovoProjetoPage } from './novo-projeto';

@NgModule({
    declarations: [
        NovoProjetoPage
    ],
    imports: [
        IonicPageModule.forChild(NovoProjetoPage),
        SharedModule

    ],
    exports: [
        NovoProjetoPage
    ],
    entryComponents: [],
    providers: [InAppBrowser, SocialSharing]
})
export class NovoProjetoPagePageModule { }