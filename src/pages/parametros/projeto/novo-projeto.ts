import { Component } from '@angular/core';
import { NavController, ModalController, IonicPage, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx'
import { SocialSharing } from '@ionic-native/social-sharing';
import * as moment from 'moment';

import { Evento } from './../../../core/models/evento';
import { Validators, FormGroup, FormControl } from '@angular/forms';

@IonicPage()
@Component({
    selector: 'page-novo-projeto',
    templateUrl: 'novo-projeto.html',
    providers: []
})
export class NovoProjetoPage {

    projeto: any;
    validation_messages = {
        nome: [
            { type: 'required', message: 'Informe o nome do projeto.' }
        ],
        sobre: [
            { type: 'required', message: 'Insira dados sobre o proeto' },
            { type: 'minlength', message: 'Digite no mínimo 30 caracteres.' },
            { type: 'maxlength', message: 'Digite no máximo 512 caracteres.' },
        ]
    }



    exibirLinkCompra: boolean;
    evento: Evento;
    options: InAppBrowserOptions = {
        location: 'yes',//Or 'no' 
        hidden: 'no', //Or  'yes'
        clearcache: 'yes',
        clearsessioncache: 'yes',
        zoom: 'yes',//Android only ,shows browser zoom controls 
        hardwareback: 'yes',
        mediaPlaybackRequiresUserAction: 'no',
        shouldPauseOnSuspend: 'no', //Android only 
        closebuttoncaption: 'Close', //iOS only
        disallowoverscroll: 'no', //iOS only 
        toolbar: 'yes', //iOS only 
        enableViewportScale: 'no', //iOS only 
        allowInlineMediaPlayback: 'no',//iOS only 
        presentationstyle: 'pagesheet',//iOS only 
        fullscreen: 'yes',//Windows only    
    };

    constructor(public navParams: NavParams, public navCtrl: NavController, private iab: InAppBrowser, private socialSharing: SocialSharing) {
        moment.locale('pt-BR');

        this.projeto = new FormGroup({
            nome: new FormControl('', Validators.required),
            sobre: new FormControl('', [Validators.required, Validators.minLength(30), Validators.maxLength(512)]),
        });
    }


    ionViewDidLoad() {
        this.exibirLinkCompra = this.navParams.get('exibirLinkCompra') || false;
        this.evento = this.navParams.get('projeto');

    }

    obterDataEvento(evento) {
        if (!evento) return;
        const data = new Date(evento.DtInicio);
        const hora = moment(data).format('llll').split('às')
        return hora[0];
    }

    obterHorarioEvento(evento) {
        if (!evento) return;
        const starts_at = new Date(evento.DtInicio);
        const ends_at = new Date(evento.DtFim);
        let horario = `às ${moment(starts_at).format('HH')}h`;

        if (ends_at) {
            horario = `das ${moment(starts_at).format('HH')}h às ${moment(ends_at).format('HH')}h`;
        }
        return horario;
    }

    navegarParaLetsEvents(evento) {
        if (!evento) return false;

        const browser = this.iab.create(evento.LinkCompartilhado, "_self", this.options);
    }
    compilemsg(): string {
        const msg = `${this.evento.Nome} \n ${this.evento.Descricao} \n Via SonarDay App`;
        return msg;
    }
    regularShare() {
        var msg = this.compilemsg();
        this.socialSharing.share(msg, null, null, null);
    }

    close() {
        this.navCtrl.pop();
    }
}


