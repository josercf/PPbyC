import { Component } from '@angular/core';
import { NavController, ModalController, IonicPage, ActionSheetController, Platform, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Projeto } from '../../core/models/projeto';

@Component({
    selector: 'page-projeto-cadastro',
    templateUrl: 'projeto-cadastro.html',
    providers: []
})
export class ProjetoCadastroPage {

    projeto: any;
    projetoModel: Projeto;
    prioridade: number = 1;
    titulo = "Novo Projeto";
    validation_messages = {
        nome: [
            { type: 'required', message: 'Informe o nome do projeto.' }
        ],
        sobre: [
            { type: 'required', message: 'Informe uma descrição.' }
        ],
        metodologia: [
            { type: 'required', message: 'Selecione uma metodologia.' }
        ],
        prioridade: [
            { type: 'required', message: 'Informe a prioridade.' }
        ]
    }

    constructor(
        public navParams: NavParams,
        public platform: Platform,
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        public actionSheetCtrl: ActionSheetController) {
        this.projeto = new FormGroup({
            nome: new FormControl('', Validators.required),
            sobre: new FormControl('', [Validators.required]),
            metodologia: new FormControl('', [Validators.required]),
            prioridade: new FormControl('', [Validators.required])
        });
    }

    ionViewDidLoad() {
        this.projetoModel = this.navParams.get('projeto');
        if (this.projetoModel && this.projetoModel.Id && this.projetoModel.Id.length > 1) {
            this.titulo = "Alterar Projeto";
        }
    }

    gravar() {
        if (this.projetoModel && this.projetoModel.Id && this.projetoModel.Id.length > 1) {
        }

        this.navCtrl.pop();
    }


}
