import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NivelPage } from "./nivel";

@NgModule({
    declarations: [
        NivelPage
    ],
    imports: [
        IonicPageModule.forChild(NivelPage)

    ],
    exports: [
        NivelPage
    ],
    entryComponents: [],
    providers: []
})
export class NivelPagePageModule { }