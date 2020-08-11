import { User } from './../../core/models/user';
import { PerfilEditarPage } from './../perfil-editar/perfil-editar';
import { FornecedoresPage } from './../fornecedores/fornecedores';
import { JwtData } from './../../core/class/claim';
import { Identity } from './../../core/class/identity';
import { AuthService } from './../../core/services/auth.service';
import { ContatosPage } from './../contatos/contatos';
import { Component } from '@angular/core';
import { NavController, ModalController, IonicPage, ActionSheetController, Platform } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { HomePage } from "../home/home";
import { PontuacaoPage } from "../pontuacao/pontuacao";


@IonicPage()
@Component({
    selector: 'page-perfil',
    templateUrl: 'perfil.html',
    providers: []
})
export class PerfilPage {

    jwt: JwtData;
    constructor(
        public platform: Platform,
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        public authService: AuthService,
        public actionSheetCtrl: ActionSheetController) {

    }

    ionViewDidLoad() {

        this.authService.getIdentity().then(identity => {

            this.jwt = identity.getJwtData();
        });
    }

    exibirContatos() {
        let contatosModal = this.modalCtrl.create(ContatosPage);
        contatosModal.present();

    }

    exibirFornecedores() {
        let fornecedoresModal = this.modalCtrl.create(FornecedoresPage);
        fornecedoresModal.present();

    }

    resgatarPontuacao() {
        let pontuacaoModal = this.modalCtrl.create(PontuacaoPage);
        pontuacaoModal.present();

    }

    editar() {
        this.navCtrl.push(PerfilEditarPage, { usuario: this.jwt });
 
    }

    presentActionSheet() {
        const actionSheet = this.actionSheetCtrl.create({
            title: 'Quer mesmo sair?',
            buttons: [
                {
                    text: 'Sair',
                    role: 'destructive',
                    handler: () => {

                        this.authService.logout();
                        this.navCtrl.setRoot(HomePage);
                    }
                }, {
                    text: 'Cancel',
                    role: 'cancel',
                    icon: !this.platform.is('ios') ? 'close' : null,
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    }

}
