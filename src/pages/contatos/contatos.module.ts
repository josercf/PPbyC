


import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContatosPage } from "./contatos";
import { SharedModule } from "../../shared/shared.module";



@NgModule({
    declarations: [
        ContatosPage
    ],
    imports: [
        IonicPageModule.forChild(ContatosPage),
        SharedModule

    ],
    exports: [
        ContatosPage
    ],
    entryComponents: [ContatosPage]
})
export class ContatosPageModule { }