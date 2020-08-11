import { finalize } from 'rxjs/operators';

import { Component } from '@angular/core';
import { NavController, ModalController, IonicPage } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { EventoService } from "../../../core/services";
import { DetalheEventoPage } from "../detalhe/detalhe-evento";
import { Evento } from "../../../core/models/index";
const QTD_EVENTOS_POR_VEZ = 10;

@IonicPage()
@Component({
  selector: 'page-eventos-realizados',
  templateUrl: 'eventos-realizados.html',
  entryComponents: []
})
export class EventosRealizadosPage {

  eventosRealizados: Evento[];
  carregandoEventos: boolean;
  eventosCarregados: boolean;


  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private eventoService: EventoService) {

  }

  ionViewDidLoad() {

    this.paginarEventos(null);

  }

  paginarEventos(infinite) {

    if (!infinite) {
      this.carregandoEventos = true;
    }
    const paginaEventos = infinite ? infinite.paginaEventos : 1;
    this.obterEventosRealizados(paginaEventos)
      .pipe(finalize(() => this.carregandoEventos = false))
      .subscribe(result => {
        this.eventosRealizados = result;
        this.eventosCarregados = true;
        if (infinite && infinite.infiniteScroll) {
          infinite.infiniteScroll.complete();
        }
      })
  }

  obterEventosRealizados(paginaEventos) {

    return this.eventoService.obterRealizados(QTD_EVENTOS_POR_VEZ * paginaEventos);
  }

  detalhe(evento) {
    this.navCtrl.push(DetalheEventoPage, { evento: evento });

  }

  doRefresh($event) {

    this.obterEventosRealizados(1).subscribe(result => {
      this.eventosRealizados = result;
      this.eventosCarregados = true;
      $event.complete();
    });
  }
  contemEventos(): boolean {

    return this.eventosRealizados && this.eventosRealizados.length > 0;
  }
}
