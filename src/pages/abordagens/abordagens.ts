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
import { Variavel } from '../../core/models/Variavel';
import { VariavelService } from '../../core/services/variavel.service';

const QTD_EVENTOS_POR_VEZ = 10;

@IonicPage()
@Component({
  selector: 'page-abordagens',
  templateUrl: 'abordagens.html',
  entryComponents: []
})
export class AbordagensPage {

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
  variaveis: Variavel[];


  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public eventoService: EventoService,
    public pontuacaoService: PontuacaoService,
    public refreshService: RefreshService,
    private authService: AuthService,
    public competenciaService: CompetenciaService,
    public variavelService: VariavelService,
    public metodologiaService: MetodologiaService,
    public projetoService: ProjetoService) {

  }

  ionViewDidLoad() {


    this.carregarCompetencias();
    this.carregarMetodologias();
    this.carregarProjetos();
    this.carregarVariaveis();


    this.authService.getIdentity().then(identity => {
      if (identity.AccessToken) {
        this.jwt = identity.getJwtData();
      }
    });
  }


  carregarVariaveis() {
    this.variavelService.listar()
      .pipe(finalize(() => this.carregandoPontuacao = false))
      .subscribe(variaveis => this.variaveis = variaveis)
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


  perfilModal() {
    this.navCtrl.push(PerfilPage);
    // const modal = this.modalCtrl.create(PerfilPage);
    // modal.present();
  }
}