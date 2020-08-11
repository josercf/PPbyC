import { finalize } from 'rxjs/operators';
import { PontuacaoService } from '../../core/services/pontuacao.service';
import { Component } from '@angular/core';
import { NavController, ModalController, IonicPage } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { EventoService, AuthService } from "../../core/services";
import { DetalheEventoPage } from "../eventos/detalhe/detalhe-evento";
import { NivelPage } from "../eventos/nivel/nivel";
import { Observable } from 'rxjs/Observable';
import { RefreshService } from "../../core/services/refresh-service";
import { PerfilPage } from "../perfil/perfil";
import { Evento } from "../../core/models/evento";
import { CompetenciaService } from '../../core/services/competencia.service';
import { Competencia } from '../../core/models/competencia';
import { MetodologiaService } from '../../core/services/metodologia.service';
import { Metodologia } from '../../core/models/metodologia';
import { Projeto } from '../../core/models/projeto';
import { ProjetoService } from '../../core/services/projeto.service';
import { AgenteAvaliacaoPage } from '../agente-avaliacao/agente-avaliacao';

const QTD_EVENTOS_POR_VEZ = 10;

@IonicPage()
@Component({
  selector: 'page-agentes',
  templateUrl: 'agentes.html',
  entryComponents: []
})
export class AgentesPage {

  opcao: string = "competencias";

  proximosEventos: Evento[];
  eventosCarregados: boolean;
  pontuacao: number = 0;
  carregandoEventos: boolean;
  carregandoPontuacao: boolean;
  jwt: any;

  competencias: Competencia[];
  metodologias: Metodologia[];
  projetos: Projeto[];
  agentes: any[] = [];


  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public eventoService: EventoService,
    public pontuacaoService: PontuacaoService,
    public refreshService: RefreshService,
    private authService: AuthService,
    public competenciaService: CompetenciaService,
    public metodologiaService: MetodologiaService,
    public projetoService: ProjetoService) {

  }

  ionViewDidLoad() {

    this.carregarPontuacoes();

    this.carregarCompetencias();
    this.carregarMetodologias();
    this.carregarProjetos();

    this.refreshService.ranking()
      .subscribe(c => {
        this.carregarPontuacoes();
      });

    this.authService.getIdentity().then(identity => {
      if (identity.AccessToken) {
        this.jwt = identity.getJwtData();
      }
    });

    for (let i = 1; i < 30; i++) {
      this.agentes.push({ Nome: `Camila Freitas Nonato`, Cargo: "Gerente Sênior" });
    }

  }
  carregarPontuacoes() {
    this.carregandoPontuacao = true;
    this.pontuacaoService.get()
      .pipe(finalize(() => this.carregandoPontuacao = false))
      .subscribe(pontuacao => this.pontuacao = pontuacao);
  }


  carregarCompetencias() {
    this.competenciaService.listar()
      .pipe(finalize(() => this.carregandoPontuacao = false))
      .subscribe(competencias => this.competencias = competencias)
  }

  carregarMetodologias() {
    this.metodologiaService.listar()
      .pipe(finalize(() => this.carregandoPontuacao = false))
      .subscribe(metodologias => this.metodologias = metodologias)
  }

  carregarProjetos() {
    this.projetoService.listar()
      .pipe(finalize(() => this.carregandoPontuacao = false))
      .subscribe(projetos => this.projetos = projetos)
  }


  obterProximosEventos(paginaEventos) {

    return this.eventoService.obterProximos(QTD_EVENTOS_POR_VEZ * paginaEventos);
  }

  avaliacao(agente) {
    this.navCtrl.push(AgenteAvaliacaoPage, { agente: agente });

  }

  perfilModal() {
    this.navCtrl.push(PerfilPage);
    // const modal = this.modalCtrl.create(PerfilPage);
    // modal.present();
  }

}