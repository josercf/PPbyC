
import { Component } from '@angular/core';
import { NavController, ModalController, IonicPage, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Noticia } from "./../../../core/models";

const QTD_NOTICAS_POR_VEZ = 10;
@IonicPage()
@Component({
    selector: 'page-noticia-detalhe',
    templateUrl: 'noticia-detalhe.html',
    providers: []
})
export class NoticiaDetalhePage {

    noticia: Noticia;

    constructor(public navParams: NavParams, public navCtrl: NavController, public modalCtrl: ModalController, private socialSharing: SocialSharing) {
        moment.locale('pt-BR');
    }

    ionViewDidLoad() {
        this.noticia = this.navParams.get('noticia');
    }

    obterDataCadastroFormatada(data) {
        return `${moment(data).format('D MMM YYYY')} às ${moment(data).format('HH:mm')}`;
    }
    compilemsg(): string {
        const msg = `${this.noticia.Titulo} \n ${this.noticia.Descricao} \n Via SonarDay App`;
        return msg;
    }
    regularShare() {
        var msg = this.compilemsg();
        this.socialSharing.share(msg, null, null, null);
    }
}
