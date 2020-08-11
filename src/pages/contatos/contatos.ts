import { Component } from '@angular/core';
import { NavController, ModalController, IonicPage } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';


@IonicPage()
@Component({
    selector: 'page-contatos',
    templateUrl: 'contatos.html',
    providers: []
})
export class ContatosPage {
    contatos: any[] = [];
    constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

    }

    ionViewDidLoad() {

        for (let i = 1; i < 30; i++) {
            this.contatos.push({ posicao: i, nome: `Camila Freitas Nonato`, pontuacao: 37 * (30 - i), comentario: 'Esse App ta bem legal!' });
        }

    }


    close() {
        this.navCtrl.pop();
    }


    adicionar() { }


}
