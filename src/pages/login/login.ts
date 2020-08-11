import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { NavController, ModalController, IonicPage, AlertController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

import { CadastroPage } from "../cadastro/cadastro";

import { User } from './../../core/models/user';
import { TabsPage } from './../tabs/tabs';
import { AuthService, ExternalAuthService } from "../../core/services";

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
    providers: []
})
export class LoginPage {

    user: any;

    validation_messages = {

        email: [
            { type: 'required', message: 'Informe um e-mail válido.' }
        ],
        password: [
            { type: 'required', message: 'Informe sua senha.' },
            { type: 'minlength', message: 'Digite no mínimo 6 caracteres.' },
            { type: 'maxlength', message: 'Digite no máximo 8 caracteres.' },
        ]
    }

    constructor(
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        public fb: Facebook,
        private alertCtrl: AlertController,
        private authService: AuthService,
        private externalAuthService: ExternalAuthService) {

        this.user = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(10)])
        });

    }

    cadastro() {

        this.navCtrl.push(CadastroPage);
      }



    loginFacebook() {
        // Login with permissions
        this.fb.login(['public_profile', 'email'])
            .then((res: FacebookLoginResponse) => {

                // The connection was successful
                if (res.status == "connected") {

                    // Get user ID and Token
                    var fb_id = res.authResponse.userID;
                    var fb_token = res.authResponse.accessToken;

                    this.externalAuthService.facebook(fb_token).subscribe(result => {

                        if (result.success && result.data.Authenticated) {
                            this.authService.handleToken(result);
                            this.navCtrl.push(TabsPage);
                        }
                    })

                }
                // An error occurred while loging-in
                else {

                    console.log("An error occurred...");

                }

            })
            .catch((e) => {
                console.log('Error logging into Facebook', e);
            });
    }

    login() {
        this.navCtrl.push(TabsPage);
        // return;
        // const login = new User(this.user.controls.email.value, this.user.controls.password.value);

        // this.authService.login(login).subscribe(result => {
        //     if (result.Authenticated) {
        //         this.navCtrl.push(TabsPage);
        //     }
        //     else {
        //         let message = "Não foi possível realizar o login";

        //         if (result.Message) {
        //             message = result.Message;
        //         }
        //         let alert = this.alertCtrl.create({
        //             title: "BBbyC",
        //             message: message,
        //             buttons: ['OK']
        //         });
        //         alert.present();
        //     }
        // });

    }

}
