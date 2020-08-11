import { FornecedorService } from './../../core/services/fornecedor.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { FornecedoresPage } from "./fornecedores";
import { SharedModule } from "../../shared/shared.module";




@NgModule({
    declarations: [
        FornecedoresPage
    ],
    imports: [
        IonicPageModule.forChild(FornecedoresPage),
        SharedModule,
        IonicModule

    ],
    exports: [
        FornecedoresPage
    ],
    entryComponents: [FornecedoresPage],
    providers: [FornecedorService]
})
export class FornecedoresPageModule { }