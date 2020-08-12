import { finalize } from 'rxjs/operators';
import { Component } from '@angular/core';
import { NavController, ModalController, IonicPage } from 'ionic-angular';
import { AuthService } from "../../core/services";
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
import { AgenteService } from '../../core/services/agente.service';
import { Agente } from '../../core/models/agente';
import { AgenteAlocacaoPage } from '../agente-alocacao/agente-alocacao';

const QTD_EVENTOS_POR_VEZ = 10;

@IonicPage()
@Component({
  selector: 'page-alocacao',
  templateUrl: 'alocacao.html',
  entryComponents: []
})
export class AlocacaoPage {

  opcao: string = "competencias";

  proximosEventos: Evento[];

  carregandoCompetencias: boolean;
  carregandoAgentes: boolean;
  carregandoPontuacao: boolean;
  jwt: any;

  competencias: Competencia[];
  metodologias: Metodologia[];
  projetos: Projeto[];
  agentes: Agente[] = [];


  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public refreshService: RefreshService,
    private authService: AuthService,
    public competenciaService: CompetenciaService,
    public metodologiaService: MetodologiaService,
    public projetoService: ProjetoService,
    public agenteService: AgenteService) {

  }

  ionViewDidLoad() {


    this.carregarCompetencias();
    this.carregarMetodologias();
    this.carregarProjetos();
    this.carregarAgentes();



    this.authService.getIdentity().then(identity => {
      if (identity.AccessToken) {
        this.jwt = identity.getJwtData();
      }
    });

    for (let i = 1; i < 30; i++) {
      this.agentes.push({ Nome: `Camila Freitas Nonato`, Cargo: "Gerente Sênior" });
    }

  }

  carregarAgentes() {
    this.agenteService.listar()
      .pipe(finalize(() => this.carregandoAgentes = false))
      .subscribe(agentes => this.agentes = agentes);
  }


  carregarCompetencias() {
    this.competenciaService.listar()
      .pipe(finalize(() => this.carregandoCompetencias = false))
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



  alocar(agente) {
    this.navCtrl.push(AgenteAlocacaoPage, { agente: agente });

  }

  perfilModal() {
    this.navCtrl.push(PerfilPage);
    // const modal = this.modalCtrl.create(PerfilPage);
    // modal.present();
  }

}