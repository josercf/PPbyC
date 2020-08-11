import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalheEventoPage } from "./detalhe-evento";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { SocialSharing } from '@ionic-native/social-sharing';

@NgModule({
    declarations: [
        DetalheEventoPage
    ],
    imports: [
        IonicPageModule.forChild(DetalheEventoPage),
        SharedModule

    ],
    exports: [
        DetalheEventoPage
    ],
    entryComponents: [],
    providers: [InAppBrowser, SocialSharing]
})
export class DetalheEventoPageModule { }