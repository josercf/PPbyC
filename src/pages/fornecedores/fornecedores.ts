import { Fornecedor } from './../../core/models/fornecedor';
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { FornecedorService } from "../../core/services/fornecedor.service";
import { finalize } from "rxjs/operators";
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser/ngx";


@IonicPage()
@Component({
    selector: 'page-fornecedores',
    templateUrl: 'fornecedores.html',
    providers: []
})
export class FornecedoresPage {
    fornecedores: Fornecedor[];
    carregandoFornecedores: boolean;
    fornecedoresCarregados: boolean;
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

    constructor(public navCtrl: NavController, public fornecedorService: FornecedorService, private iab: InAppBrowser) {

    }

    ionViewDidLoad() {
        this.carregandoFornecedores = true;
        this.fornecedorService.getAllActive()
            .pipe(finalize(() => this.carregandoFornecedores = false))
            .subscribe(result => {
                this.fornecedores = result;
                this.fornecedoresCarregados = true;
            });
    }
    close() {
        this.navCtrl.pop();
    }

    navegarParaSite(fornecedor) {
        if (!fornecedor) return false;

        const browser = this.iab.create(fornecedor.Site, "_self", this.options);
    }

    contemFornecedores(): boolean {
        return this.fornecedores && this.fornecedores.length > 0
    }

}
