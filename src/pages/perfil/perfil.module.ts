import { PerfilEditarPageModule } from './../perfil-editar/perfil-editar.module';



import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerfilPage } from "./perfil";
import { SharedModule } from "../../shared/shared.module";




@NgModule({
    declarations: [
        PerfilPage
    ],
    imports: [
        IonicPageModule.forChild(PerfilPage),
        PerfilEditarPageModule,
        SharedModule

    ],
    exports: [
        PerfilPage
    ],
    entryComponents: []
})
export class PerfilPageModule { }