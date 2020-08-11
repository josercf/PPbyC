import { finalize } from 'rxjs/operators';
import { PontuacaoService } from '../../core/services/pontuacao.service';
import { Component } from '@angular/core';
import { NavController, ModalController, IonicPage } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { EventoService, AuthService } from "../../core/services";
import { DetalheEventoPage } from  "../eventos/detalhe/detalhe-evento";
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

    this.paginarEventos(null);
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
  }
  carregarPontuacoes() {
    this.carregandoPontuacao = true;
    this.pontuacaoService.get()
      .pipe(finalize(() => this.carregandoPontuacao = false))
      .subscribe(pontuacao => this.pontuacao = pontuacao);
  }


  carregarCompetencias(){
    this.competenciaService.listar()
    .pipe(finalize(() =>  this.carregandoPontuacao = false))
    .subscribe(competencias => this.competencias = competencias)
  }

  carregarMetodologias(){
    this.metodologiaService.listar()
    .pipe(finalize(() =>  this.carregandoPontuacao = false))
    .subscribe(metodologias => this.metodologias = metodologias)
  }

  carregarProjetos(){
    this.projetoService.listar()
    .pipe(finalize(() =>  this.carregandoPontuacao = false))
    .subscribe(projetos => this.projetos = projetos)
  }


  paginarEventos(infinite) {
    if (!infinite) {
      this.carregandoEventos = true;
    }
    const paginaEventos = infinite ? infinite.paginaEventos : 1;
    this.obterProximosEventos(paginaEventos)
      .pipe(finalize(() => this.carregandoEventos = false))
      .subscribe(result => {
        this.proximosEventos = result;
        this.eventosCarregados = true;
        if (infinite && infinite.infiniteScroll) {
          infinite.infiniteScroll.complete();
        }
      })
  }

  obterProximosEventos(paginaEventos) {

    return this.eventoService.obterProximos(QTD_EVENTOS_POR_VEZ * paginaEventos);
  }

  detalhe(evento) {
    this.navCtrl.push(DetalheEventoPage, { evento: evento, exibirLinkCompra: true });

  }

  detalheProjeto(projeto){
    this.navCtrl.push(DetalheEventoPage, { evento: null, exibirLinkCompra: true });
  }

  doRefresh($event) {

    const eventos = this.obterProximosEventos(1);
    const pontuacoes = this.pontuacaoService.get();

    Observable.forkJoin([eventos, pontuacoes]).subscribe(result => {

      this.proximosEventos = result[0];
      this.pontuacao = result[1];
      this.eventosCarregados = true;
      $event.complete();
    });
  }

  nivelModal() {
    const modal = this.modalCtrl.create(NivelPage);
    modal.present();
  }


  perfilModal() {
    this.navCtrl.push(PerfilPage);
    // const modal = this.modalCtrl.create(PerfilPage);
    // modal.present();
  }

  contemEventos(): boolean {

    return this.proximosEventos && this.proximosEventos.length > 0;
  }

  contemCompetencias(): boolean {

    return this.competencias && this.competencias.length > 0;
  }

  contemMetodologias(): boolean {

    return this.metodologias && this.metodologias.length > 0;
  }

  contemProjetos(): boolean {
    return this.projetos && this.projetos.length > 0;
  }
}