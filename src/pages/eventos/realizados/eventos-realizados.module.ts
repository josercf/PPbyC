import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from './../../../shared/shared.module';
import { EventosRealizadosPage } from './eventos-realizados';
import { EventoService } from "../../../core/services";

@NgModule({
    declarations: [
        EventosRealizadosPage

    ],
    imports: [
        SharedModule,
        IonicPageModule.forChild(EventosRealizadosPage)

    ],
    exports: [
        EventosRealizadosPage
    ],
    entryComponents: [],
    providers: [EventoService]
})
export class EventosRealizadosPageModule { }