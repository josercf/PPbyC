import { Component } from '@angular/core';
import { NavController, ModalController, IonicPage, ActionSheetController, Platform } from 'ionic-angular';

@Component({
    selector: 'page-perfil-visualizar',
    templateUrl: 'perfil-visualizar.html',
    providers: []
})
export class PerfilVisualizarPage {


    constructor(
        public platform: Platform,
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        public actionSheetCtrl: ActionSheetController) {

    }

    ionViewDidLoad() {

    }


}
