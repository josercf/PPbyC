import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';


@Component({
  selector: 'app-lista-competencias',
  templateUrl: './lista-competencias.component.html'
})
export class ListaCompetenciasComponent implements OnInit {
  ultimaData: string = null;
  paginaEventos: number = 1;
  @Input() eventos: any[]
  @Output() obterEventos: EventEmitter<any> = new EventEmitter<any>();
  @Output() detalhe: EventEmitter<any> = new EventEmitter<any>();
  constructor() { moment.locale('pt-BR'); }

  ngOnInit() {
  }

  scrollEventos(infiniteScroll) {
    this.paginaEventos = this.paginaEventos + 1;
    this.obterEventos.emit({ infiniteScroll: infiniteScroll, paginaEventos: this.paginaEventos });
  }

  dividirDataProximoEvento(evento) {
    if (!this.ultimaData) {
      this.ultimaData = this.obterDataEvento(evento);
      return true;
    }
    return evento && this.ultimaData != this.obterDataEvento(evento);
  }

  obterDataEvento(evento) {
    const data = new Date(evento.DtInicio);
    const hora = moment(data).format('llll').split('às')
    return hora[0];
  }

  obterHorarioEvento(evento) {
    const starts_at = new Date(evento.DtInicio);
    const ends_at = new Date(evento.DtFim);
    return `das ${moment(starts_at).format('HH')}h às ${moment(ends_at).format('HH')}h`;
  }

  obterDatas(eventos) {

    return _.uniq(_.map(eventos, evento => this.obterDataEvento(evento)))
  }

  obterEventosPorData(data, eventos) {
    return _.filter(eventos, evento => this.obterDataEvento(evento) === data)
  }
  onDetalhe(item) {
    this.detalhe.emit(item);
  }
}
