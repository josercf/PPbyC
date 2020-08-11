import { Component, OnInit, Input } from '@angular/core';
import { PerfilPage } from "../../../pages/perfil/perfil";
import { NavController, ModalController } from "ionic-angular";



@Component({
  selector: 'default-navbar',
  templateUrl: './default-navbar.component.html'
})
export class DefaultNavbarComponent {

  @Input() title: string;
  @Input() id: string;
  @Input() class: string;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController) { }

  ngOnInit() {

    if (!this.id) {
      this.id = "sonar_navbar"
    }

  }

}
