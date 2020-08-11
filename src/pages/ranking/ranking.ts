import { PerfilVisualizarPage } from './../perfil-visualizar/perfil-visualizar';
import { finalize } from 'rxjs/operators';

import { Component } from '@angular/core';
import { NavController, ModalController, IonicPage } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { RankingService } from "../../core/services/ranking.service";
import { Ranking } from './../../core/models';
import { RefreshService } from "../../core/services/refresh-service";
@IonicPage()
@Component({
    selector: 'page-ranking',
    templateUrl: 'ranking.html',
    providers: []
})
export class RankingPage {
    ranking: Ranking[];
    carregandoRanking: boolean;
    rankingCarregado: boolean;
    constructor(public navCtrl: NavController, public modalCtrl: ModalController, public rankingService: RankingService, public refreshService: RefreshService) {

    }

    ionViewDidLoad() {

        this.carregarPontuacoes();

        this.refreshService.ranking()
            .subscribe(c => {
                this.carregarPontuacoes();
            });
    }
    carregarPontuacoes() {
        this.carregandoRanking = true;
        this.rankingService.getList()
            .pipe(finalize(() => this.carregandoRanking = false))
            .subscribe(ranking => {
                this.ranking = ranking;
                this.rankingCarregado = true;
            });
    }

    doRefresh($event) {
        this.rankingService.getList().subscribe(ranking => {
            this.ranking = ranking;
            this.rankingCarregado = true;
            $event.complete();
        });

    }

    contemRanking(): boolean {
        return this.ranking && this.ranking.length > 0;
    }

    perfil(usuario) {
        this.navCtrl.push(PerfilVisualizarPage, { usuario: usuario });

    }


}
