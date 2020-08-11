import { Component, OnInit, Input } from '@angular/core';
import { NavController } from "ionic-angular";

@Component({
    selector: 'display-validation',
    templateUrl: './display-validation.component.html'
})
export class DisplayValidationComponent implements OnInit {

    @Input() messages: any;
    @Input() field: string;
    @Input() form: any;
    constructor(public navCtrl: NavController) { }

    ngOnInit() {
    }


}
