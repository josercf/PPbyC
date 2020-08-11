import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from "../../shared/shared.module";
import { AgenteAvaliacaoPage } from './agente-avaliacao';




@NgModule({
    declarations: [
        AgenteAvaliacaoPage
    ],
    imports: [
        IonicPageModule.forChild(AgenteAvaliacaoPage),
        SharedModule

    ],
    exports: [
        AgenteAvaliacaoPage
    ],
    entryComponents: []
})
export class AgenteAvaliacaoPageModule { }