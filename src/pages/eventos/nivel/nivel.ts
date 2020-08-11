import { Component } from '@angular/core';
import { NavController, ModalController, IonicPage, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
    selector: 'page-nivel',
    templateUrl: 'nivel.html',
    providers: []
})
export class NivelPage {


    constructor(public navParams: NavParams, public navCtrl: NavController) {

    }


    ionViewDidLoad() {


    }

    close() {
        this.navCtrl.pop();
    }

}
