import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from "../../shared/shared.module";
import { AgenteAlocacaoPage } from './agente-alocacao';




@NgModule({
    declarations: [
        AgenteAlocacaoPage
    ],
    imports: [
        IonicPageModule.forChild(AgenteAlocacaoPage),
        SharedModule

    ],
    exports: [
        AgenteAlocacaoPage
    ],
    entryComponents: []
})
export class AgenteAlocacaoPageModule { }