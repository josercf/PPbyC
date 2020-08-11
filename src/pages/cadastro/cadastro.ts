import { AuthService } from './../../core/services/auth.service';
import { AccountService } from './../../core/services/account.service';
import { User } from './../../core/models';
import { Component } from '@angular/core';
import { LoginPage } from "../login/login";

import { NavController, ModalController, IonicPage } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Validators, FormBuilder, FormGroup, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { TabsPage } from "../tabs/tabs";

@IonicPage()
@Component({
    selector: 'page-cadastro',
    templateUrl: 'cadastro.html',
    providers: []
})
export class CadastroPage {
    user: any;
    validation_messages = {
        nome: [
            { type: 'required', message: 'Informe seu nome.' }
        ],
        email: [
            { type: 'required', message: 'Informe um e-mail válido.' }
        ],
        password: [
            { type: 'required', message: 'Informe sua senha.' },
            { type: 'minlength', message: 'Digite no mínimo 6 caracteres.' },
            { type: 'maxlength', message: 'Digite no máximo 8 caracteres.' },
        ],
        confirmPassword: [
            { type: 'required', message: 'Informe a confirmação de senha.' },
            { type: 'minlength', message: 'Digite no mínimo 6 caracteres.' },
            { type: 'maxlength', message: 'Digite no máximo 8 caracteres.' },
            { type: 'equalTo', message: 'As senhas estão diferentes.' }
        ]
    }

    constructor(public navCtrl: NavController, public modalCtrl: ModalController, public accountService: AccountService, public authService: AuthService) {
        this.user = new FormGroup({
            nome: new FormControl('', Validators.required),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
            confirmPassword: new FormControl('', [Validators.required, , Validators.minLength(6), , Validators.maxLength(10), this.equalto('password')])
        });
    }

    ionViewDidLoad() {
    }

    login() {

        this.navCtrl.push(LoginPage);
    }

    equalto(field_name): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            let input = control.value;
            let isValid = control.root.value[field_name] == input;
            if (!isValid)
                return { 'equalTo': { isValid } };
            else
                return null;
        };
    }

    cadastrar() {
        const account = new User();
        account.Name = this.user.controls.nome.value;
        account.Email = this.user.controls.email.value;
        account.UserName = this.user.controls.email.value;
        account.Password = this.user.controls.password.value;
        account.ConfirmPassword = this.user.controls.confirmPassword.value;

        this.accountService.register(account).subscribe(response => {

            if (response.success) {
                this.authService.login(account).subscribe(result => {
                    if (result.Authenticated) {
                        this.navCtrl.push(TabsPage);
                    }
                });
            }
        });
    }

}

