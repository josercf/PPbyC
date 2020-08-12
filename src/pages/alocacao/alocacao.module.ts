
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from '../../shared/shared.module';
import { CompetenciaService } from '../../core/services/competencia.service';
import { MetodologiaService } from '../../core/services/metodologia.service';
import { ProjetoService } from '../../core/services/projeto.service';
import { AgenteService } from '../../core/services/agente.service';
import { AlocacaoPage } from './alocacao';

@NgModule({
  declarations: [
    AlocacaoPage
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(AlocacaoPage)

  ],
  exports: [
    AlocacaoPage
  ],
  entryComponents: [],
    providers: [
      CompetenciaService, 
      MetodologiaService,
      ProjetoService,
      AgenteService]

})
export class AlocacaoPageModule { }