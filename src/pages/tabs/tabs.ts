import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { ParametrosPage } from '../parametros/parametros';
import { AbordagensPage } from '../abordagens/abordagens';
import { AgentesPage } from '../agentes/agentes';
import { AlocacaoPage } from '../alocacao/alocacao';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabCadastro = ParametrosPage
  tabAbordagens = AbordagensPage
  tabAgentes = AgentesPage
  tabAlocar = AlocacaoPage

  constructor() { }

}
