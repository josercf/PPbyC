import { Component } from '@angular/core';
import { NavController, ModalController, IonicPage } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { LoginPage } from "../login/login";
import { CadastroPage } from "../cadastro/cadastro";
import { AuthService } from "../../core/services";
import { TabsPage } from "../tabs/tabs";
import { LoadingService } from "../../core/services/loading.service";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: []
})
export class HomePage {

  authenticated: boolean = false;
  showHome: boolean = false;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public authService: AuthService, public loadingService: LoadingService) {

  }

  ionViewDidLoad() {

    this.loadingService.presentWithGif();



    this.authService.getIdentity().then(identity => {
      this.authenticated = identity.Authenticated;
     
      if (this.authenticated) {
        this.navCtrl.push(TabsPage);
      }
      else {
        this.showHome = true;
      }
      this.loadingService.dismiss();
    });

  }

  cadastro() {

    this.navCtrl.push(CadastroPage);
  }

  login() {

    this.navCtrl.push(LoginPage);
  }

}
