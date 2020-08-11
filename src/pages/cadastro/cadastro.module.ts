import { AuthService } from './../../core/services/auth.service';
import { AccountService } from './../../core/services/account.service';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroPage } from "./cadastro";

@NgModule({
    declarations: [
        CadastroPage
    ],
    imports: [
        IonicPageModule.forChild(CadastroPage),
        SharedModule

    ],
    exports: [
        CadastroPage
    ],
    entryComponents: [],
    providers: [AccountService]
})
export class CadastroPageModule { }