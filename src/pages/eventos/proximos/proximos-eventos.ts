import { finalize } from 'rxjs/operators';
import { PontuacaoService } from './../../../core/services/pontuacao.service';
import { Component } from '@angular/core';
import { NavController, ModalController, IonicPage } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { EventoService, AuthService } from "../../../core/services";
import { DetalheEventoPage } from "../detalhe/detalhe-evento";
import { NivelPage } from "../nivel/nivel";
import { Observable } from 'rxjs/Observable';
import { RefreshService } from "../../../core/services/refresh-service";
import { PerfilPage } from "../../perfil/perfil";
import { Evento } from "../../../core/models/evento";

const QTD_EVENTOS_POR_VEZ = 10;

@IonicPage()
@Component({
  selector: 'page-proximos-eventos',
  templateUrl: 'proximos-eventos.html',
  entryComponents: []
})
export class ProximosEventosPage {

  proximosEventos: Evento[];
  eventosCarregados: boolean;
  pontuacao: number = 0;
  carregandoEventos: boolean;
  carregandoPontuacao: boolean;
  jwt: any;


  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public eventoService: EventoService,
    public pontuacaoService: PontuacaoService,
    public refreshService: RefreshService,
    private authService: AuthService) {

  }

  ionViewDidLoad() {

    this.paginarEventos(null);
    this.carregarPontuacoes();

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

}
