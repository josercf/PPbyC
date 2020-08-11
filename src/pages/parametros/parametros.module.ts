import { PontuacaoService } from './../../core/services/pontuacao.service'; 

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ParametrosPage } from './parametros';
import { EventoService } from  './../../core/services';
import { SharedModule } from './../../shared/shared.module';
import { CompetenciaService } from '../../core/services/competencia.service';
import { MetodologiaService } from '../../core/services/metodologia.service';
import { ProjetoService } from '../../core/services/projeto.service';

@NgModule({
  declarations: [
    ParametrosPage
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(ParametrosPage)

  ],
  exports: [
    ParametrosPage
  ],
  entryComponents: [],
    providers: [
      EventoService, 
      PontuacaoService, 
      CompetenciaService, 
      MetodologiaService,
      ProjetoService]

})
export class ParametrosPageModule { }