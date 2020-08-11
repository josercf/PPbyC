import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';

import { LoginPage } from './login';
import { ExternalAuthService } from "../../core/services";

@NgModule({
    declarations: [
        LoginPage
    ],
    imports: [
        IonicPageModule.forChild(LoginPage),
        SharedModule

    ],
    exports: [
        LoginPage
    ],
    entryComponents: [],
    providers: [Facebook, ExternalAuthService]
})
export class LoginPageModule { }