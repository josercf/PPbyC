import { PontuacaoService } from '../../core/services/pontuacao.service';

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { EventoService } from '../../core/services';
import { SharedModule } from '../../shared/shared.module';
import { CompetenciaService } from '../../core/services/competencia.service';
import { MetodologiaService } from '../../core/services/metodologia.service';
import { ProjetoService } from '../../core/services/projeto.service';
import { AbordagensPage } from './abordagens';
import { VariavelService } from '../../core/services/variavel.service';

@NgModule({
  declarations: [
    AbordagensPage
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(AbordagensPage)

  ],
  exports: [
    AbordagensPage
  ],
  entryComponents: [],
  providers: [
    EventoService,
    PontuacaoService,
    CompetenciaService,
    MetodologiaService,
    ProjetoService,
    VariavelService]

})
export class AbordagensPageModule { }