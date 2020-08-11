import { RankingPage } from './../ranking/ranking';
import { EventosRealizadosPage } from './../eventos/realizados/eventos-realizados';
import { ProximosEventosPage } from './../eventos/proximos/proximos-eventos';
import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { NoticiasPage } from "../noticias/lista/noticias-lista";
import { ParametrosPage } from '../parametros/parametros';
import { AbordagensPage } from '../abordagens/abordagens';
import { AgentesPage } from '../agentes/agentes';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabParametros = ParametrosPage;
  tabProximosEventos = ProximosEventosPage;
  tabAbordagens = AbordagensPage;
  //tabEventosRealizados = EventosRealizadosPage;
  //tabRanking = RankingPage;
  tabRanking = AgentesPage;
  tabNoticias = NoticiasPage;

  constructor() { }

}
