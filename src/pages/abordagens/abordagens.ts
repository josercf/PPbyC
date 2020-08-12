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
import { MetodologiaAvaliacao } from '../../core/models/metodologia-avaliacao';

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
  editando: boolean;
  jwt: any;

  competencias: Competencia[];
  metodologias: Metodologia[];
  projetos: Projeto[];
  variaveis: Variavel[];
  avaliacao: MetodologiaAvaliacao[] = [];
  abordagem: string;


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
      .subscribe(competencias => {
        this.competencias = competencias;
        this.limparFormularioAvaliacao();
      })
  }

  limparFormularioAvaliacao() {

    this.avaliacao = this.competencias.map(c => {
      return { IdUsuario: this.jwt.sid, IdCompetencia: c.Id, IdPeso: 0 }
    });


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

  permitirGravar() {

    if (!this.editando && this.abordagem && this.avaliacao && this.avaliacao.filter(c => !c.IdPeso).length == 0) {
      return true;
    }

    return false;
  }

  registrar() {

    this.avaliacao = this.avaliacao.map(c => {

      return Object.assign({ IdAbordagem: this.abordagem }, c);
    });

    this.metodologiaService.avaliar(this.avaliacao).subscribe(response => {

      this.abordagem = "";
      this.avaliacao = this.avaliacao.map(c => {
        return Object.assign({ IdAbordagem: "", IdPseso: -1 }, c);
      });

    });


  }

  consultarAvaliacao() {
    this.editando = false;
    this.limparFormularioAvaliacao();

    if (this.abordagem) {
      this.competenciaService.consultarAvaliacao(this.jwt.sid, this.abordagem).subscribe(response => {
        if (response && response.length > 0) {
          this.avaliacao = response;
          this.editando = true;
        }
      });
    }
  }
}