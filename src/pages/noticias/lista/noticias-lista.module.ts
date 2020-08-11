import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';

import { NoticiasPage } from "./../lista/noticias-lista";
import { SharedModule } from "../../../shared/shared.module";
import { NoticiaService } from './../../../core/services';


@NgModule({
    declarations: [
        NoticiasPage
    ],
    imports: [
        IonicPageModule.forChild(NoticiasPage),
        SharedModule,
        IonicModule

    ],
    exports: [
        NoticiasPage
    ],
    entryComponents: [NoticiasPage],
    providers: [NoticiaService]
})
export class NoticiasPageModule { }