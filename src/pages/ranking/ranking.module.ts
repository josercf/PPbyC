import { PerfilVisualizarPageModule } from './../perfil-visualizar/perfil-visualziar.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RankingPage } from "./ranking";
import { SharedModule } from "../../shared/shared.module";
import { RankingService } from './../../core/services/ranking.service';

@NgModule({
    declarations: [
        RankingPage
    ],
    imports: [
        IonicPageModule.forChild(RankingPage),
        PerfilVisualizarPageModule,
        SharedModule

    ],
    exports: [
        RankingPage
    ],
    entryComponents: [RankingPage],
    providers: [RankingService]
})
export class RankingPageModule { }