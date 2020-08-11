


import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerfilVisualizarPage } from "./perfil-visualizar";
import { SharedModule } from "../../shared/shared.module";




@NgModule({
    declarations: [
        PerfilVisualizarPage
    ],
    imports: [
        IonicPageModule.forChild(PerfilVisualizarPage),
        SharedModule

    ],
    exports: [
        PerfilVisualizarPage
    ],
    entryComponents: []
})
export class PerfilVisualizarPageModule { }