import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { NoticiaDetalhePage } from "./../detalhe/noticia-detalhe";
import { SharedModule } from "../../../shared/shared.module";
import { NoticiaService } from './../../../core/services';


@NgModule({
    declarations: [
        NoticiaDetalhePage
    ],
    imports: [
        IonicPageModule.forChild(NoticiaDetalhePage),
        SharedModule,
        IonicModule

    ],
    exports: [
        NoticiaDetalhePage
    ],
    entryComponents: [NoticiaDetalhePage],
    providers: [NoticiaService, SocialSharing]
})
export class NoticiaDetalhePageModule { }