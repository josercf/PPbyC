


import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from "../../shared/shared.module";
import { PontuacaoPage } from "./pontuacao";
import { PontuacaoService } from "../../core/services/pontuacao.service";




@NgModule({
    declarations: [
        PontuacaoPage
    ],
    imports: [
        IonicPageModule.forChild(PontuacaoPage),
        SharedModule

    ],
    exports: [
        PontuacaoPage
    ],
    providers: [PontuacaoService],
    entryComponents: []
})
export class PontuacaoPageModule { }