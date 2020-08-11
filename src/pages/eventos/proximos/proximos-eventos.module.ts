import { PontuacaoService } from './../../../core/services/pontuacao.service';

 

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ProximosEventosPage } from './proximos-eventos';
import { EventoService } from './../../../core/services';
import { SharedModule } from './../../../shared/shared.module';

@NgModule({
  declarations: [
    ProximosEventosPage
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(ProximosEventosPage)

  ],
  exports: [
    ProximosEventosPage
  ],
  entryComponents: [],
    providers: [EventoService, PontuacaoService]
})
export class ProximosEventosPageModule { }