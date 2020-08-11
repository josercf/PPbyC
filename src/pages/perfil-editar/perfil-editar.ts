import { Component } from '@angular/core';
import { NavController, ModalController, IonicPage, ActionSheetController, Platform } from 'ionic-angular';

@Component({
    selector: 'page-perfil-editar',
    templateUrl: 'perfil-editar.html',
    providers: []
})
export class PerfilEditarPage {


    constructor(
        public platform: Platform,
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        public actionSheetCtrl: ActionSheetController) {

    }

    ionViewDidLoad() {

    }


}
