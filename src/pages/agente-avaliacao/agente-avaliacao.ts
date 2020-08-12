import { JwtData } from './../../core/class/claim';
import { AuthService } from './../../core/services/auth.service';
import { Component } from '@angular/core';
import { NavController, ModalController, IonicPage, ActionSheetController, Platform, NavParams } from 'ionic-angular';
import { Variavel } from '../../core/models/Variavel';
import { VariavelService } from '../../core/services/variavel.service';
import { Competencia } from '../../core/models/competencia';
import { CompetenciaService } from '../../core/services/competencia.service';
import { AgenteAvaliacao } from '../../core/models/agente-avaliacao';
import { finalize } from 'rxjs/operators';
import { MetodologiaService } from '../../core/services/metodologia.service';
import { Metodologia } from '../../core/models/metodologia';
import { AgenteService } from '../../core/services/agente.service';


@IonicPage()
@Component({
    selector: 'page-agente-avaliacao',
    templateUrl: 'agente-avaliacao.html',
    providers: []
})
export class AgenteAvaliacaoPage {

    jwt: JwtData;
    agente: any;
    variaveis: Variavel[];
    competencias: Competencia[];
    avaliacao: AgenteAvaliacao[] = [];
    metodologias: Metodologia[];
    carregandoCompetencias: boolean;
    editando: boolean = false;
    abordagem: string;
    constructor(
        public navParams: NavParams,
        public platform: Platform,
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        public authService: AuthService,
        public variavelService: VariavelService,
        public competenciaService: CompetenciaService,
        public metodologiaService: MetodologiaService,
        public agenteService: AgenteService,
        public actionSheetCtrl: ActionSheetController) {

    }

    ionViewDidLoad() {
        this.agente = this.navParams.get('agente');
        this.carregarVariaveis();
        this.carregarCompetencias();
        this.carregarMetodologias();
        this.authService.getIdentity().then(identity => {

            this.jwt = identity.getJwtData();
        });
    }

    carregarCompetencias() {
        this.competenciaService.listar()
            .pipe(finalize(() => this.carregandoCompetencias = false))
            .subscribe(competencias => {
                this.competencias = competencias;
                this.limparFormularioAvaliacao();
            })
    }

    limparFormularioAvaliacao() {

        this.avaliacao = this.competencias.map(c => {
            return { IdUsuario: this.jwt.sid, IdAgente: this.agente.Id, IdCompetencia: c.Id, IdPeso: 0 }
        });

    }

    carregarVariaveis() {
        this.variavelService.listar()
            .subscribe(variaveis => this.variaveis = variaveis)
    }

    carregarMetodologias() {
        this.metodologiaService.listar()
            .pipe(finalize(() => this.carregandoCompetencias = false))
            .subscribe(metodologias => this.metodologias = metodologias)
    }

    permitirGravar() {

        if (this.avaliacao && this.avaliacao.filter(c => !c.IdPeso).length == 0) {
            return true;
        }

        return false;
    }

    registrar() {

        this.avaliacao = this.avaliacao.map(c => {

            return Object.assign({ IdAbordagem: this.abordagem }, c);
        });

        this.agenteService.avaliar(this.avaliacao).subscribe(response => {

            this.abordagem = "";
            this.limparFormularioAvaliacao();
        });


    }

    consultarAvaliacao() {
        this.editando = false;
        this.limparFormularioAvaliacao();

        if (this.abordagem) {
            this.agenteService.consultarAvaliacao(this.jwt.sid, this.abordagem, this.agente.Id).subscribe(response => {
                if (response && response.length > 0) {
                    this.avaliacao = response;
                    this.editando = true;
                }
            });
        }
    }


}
