import { PontuacaoService } from '../../core/services/pontuacao.service'; 

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { EventoService } from  '../../core/services';
import { SharedModule } from '../../shared/shared.module';
import { CompetenciaService } from '../../core/services/competencia.service';
import { MetodologiaService } from '../../core/services/metodologia.service';
import { ProjetoService } from '../../core/services/projeto.service';
import { AgentesPage } from './agentes';
import { AgenteService } from '../../core/services/agente.service';

@NgModule({
  declarations: [
    AgentesPage
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(AgentesPage)

  ],
  exports: [
    AgentesPage
  ],
  entryComponents: [],
    providers: [
      CompetenciaService, 
      MetodologiaService,
      ProjetoService,
      AgenteService]

})
export class AgentesPageModule { }