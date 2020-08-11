import { ResgatePontuacao } from './../../core/models/resgate-pontuacao';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { JwtData } from './../../core/class/claim';
import { Identity } from './../../core/class/identity';
import { AuthService } from './../../core/services/auth.service';
import { ContatosPage } from './../contatos/contatos';
import { Component } from '@angular/core';
import { NavController, ModalController, IonicPage, ActionSheetController, Platform, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { HomePage } from "../home/home";
import { PontuacaoService } from "../../core/services/pontuacao.service";
import { RefreshService } from "../../core/services/refresh-service";


@IonicPage()
@Component({
    selector: 'page-pontuacao',
    templateUrl: 'pontuacao.html',
    providers: []
})
export class PontuacaoPage {

    jwt: JwtData;
    pontuacao: any;
    validation_messages = {
        codigo: [
            { type: 'required', message: 'Informe seu nome.' }
        ],
        email: [
            { type: 'required', message: 'Informe um e-mail válido.' }
        ]
    }
    constructor(
        public platform: Platform,
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        public toastCtrl: ToastController,
        public authService: AuthService,
        public pontuacaoService: PontuacaoService,
        public actionSheetCtrl: ActionSheetController,
        public refreshService: RefreshService) {

        this.pontuacao = new FormGroup({
            codigo: new FormControl('Codigo', [Validators.required, Validators.minLength(6)]),
            email: new FormControl('Email', Validators.required)
        });

    }

    ionViewDidLoad() {

        this.authService.getIdentity().then(identity => {

            this.jwt = identity.getJwtData();
        });
    }

    resgatar() {


        const resgate = new ResgatePontuacao();
        resgate.Codigo = this.pontuacao.controls.codigo.value;
        resgate.Email = this.pontuacao.controls.email.value;

        this.pontuacaoService.resgatar(resgate).subscribe(response => {

            if (response.success) {
                const toast = this.toastCtrl.create({
                    message: response.message,
                    duration: 3000,
                    showCloseButton: true,
                    closeButtonText: 'Ok'
                });

                toast.present();
                this.refreshService.refreshRanking();
                this.close();
            }
        });
    }

    close() {
        this.navCtrl.pop();
    }

}
