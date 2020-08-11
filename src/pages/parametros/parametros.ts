import { finalize } from 'rxjs/operators';
import { PontuacaoService } from './../../core/services/pontuacao.service';
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
import { NovoProjetoPage } from './projeto/novo-projeto';

const QTD_EVENTOS_POR_VEZ = 10;

@IonicPage()
@Component({
  selector: 'page-parametros-eventos',
  templateUrl: 'parametros.html',
  entryComponents: []
})
export class ParametrosPage {

  opcao: string = "competencias";

  proximosEventos: Evento[];
  pontuacao: number = 0;
  carregandoCompetencias: boolean;
  carregandoMetodologias: boolean;
  carregandoProjetos: boolean;
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

  
  
    this.carregarCompetencias();
    this.carregarMetodologias();
    this.carregarProjetos();

    this.authService.getIdentity().then(identity => {
      if (identity.AccessToken) {
        this.jwt = identity.getJwtData();
      }
    });
  }
 

  carregarCompetencias(){

     this.competenciaService.listar()
    .pipe(finalize(() =>  this.carregandoCompetencias = false))
    .subscribe(competencias => this.competencias = competencias)
  }

  carregarMetodologias(){
    this.metodologiaService.listar()
    .pipe(finalize(() =>  this.carregandoMetodologias = false))
    .subscribe(metodologias => this.metodologias = metodologias)
  }

  carregarProjetos(){
    this.projetoService.listar()
    .pipe(finalize(() =>  this.carregandoProjetos = false))
    .subscribe(projetos => this.projetos = projetos)
  }
 

 

  detalhe(evento) {
    this.navCtrl.push(DetalheEventoPage, { evento: evento, exibirLinkCompra: true });

  }

  detalheProjeto(projeto){
    this.navCtrl.push(DetalheEventoPage, { evento: null, exibirLinkCompra: true });
  }

  
  perfilModal() {
    this.navCtrl.push(PerfilPage);
    // const modal = this.modalCtrl.create(PerfilPage);
    // modal.present();
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