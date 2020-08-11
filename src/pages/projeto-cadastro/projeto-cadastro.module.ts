


import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjetoCadastroPage } from "./projeto-cadastro";
import { SharedModule } from "../../shared/shared.module";




@NgModule({
    declarations: [
        ProjetoCadastroPage
    ],
    imports: [
        IonicPageModule.forChild(ProjetoCadastroPage),
        SharedModule

    ],
    exports: [
        ProjetoCadastroPage
    ],
    entryComponents: []
})
export class ProjetoCadastroPageModule { }