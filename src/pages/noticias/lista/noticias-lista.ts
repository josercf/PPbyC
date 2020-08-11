import { finalize } from 'rxjs/operators';


import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

import { Noticia } from "./../../../core/models";
import { NoticiaService } from './../../../core/services';
import { NoticiaDetalhePage } from './../detalhe/noticia-detalhe';

const QTD_NOTICAS_POR_VEZ = 10;
@IonicPage()
@Component({
    selector: 'page-noticias',
    templateUrl: 'noticias-lista.html',
    providers: []
})
export class NoticiasPage {

    noticias: Noticia[];
    paginaNoticias: number = 1;
    carregandoNoticias: boolean;
    noticiasCarregadas: boolean;
    constructor(public navCtrl: NavController, private noticiaService: NoticiaService) {
        moment.locale('pt-BR');
    }

    ionViewDidLoad() {
        this.carregandoNoticias = true;
        this.noticiaService.getList(QTD_NOTICAS_POR_VEZ)
            .pipe(finalize(() => this.carregandoNoticias = false))
            .subscribe(result => {
                this.noticias = result;
                this.noticiasCarregadas = true;
            });
    }
    scrollNoticias(infinite) {

        this.paginaNoticias = this.paginaNoticias + 1;
        this.noticiaService.getList(QTD_NOTICAS_POR_VEZ * this.paginaNoticias)
            .subscribe(result => {
                this.noticias = result;
                this.noticiasCarregadas = true;
                if (infinite) {
                    infinite.complete();
                }
            });


    }

    detalhe(noticia) {
        this.navCtrl.push(NoticiaDetalhePage, { noticia: noticia });

    }

    obterDataCadastroFormatada(data) {
        return `${moment(data).format('D MMM YYYY')} às ${moment(data).format('HH:mm')}`;
    }

    doRefresh($event) {
        this.noticiaService.getList(QTD_NOTICAS_POR_VEZ).subscribe(result => {
            this.noticias = result;
            $event.complete();
        });

    }

    contemNoticias(): boolean {

        return this.noticias && this.noticias.length > 0;

    }

}
