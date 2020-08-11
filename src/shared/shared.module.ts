import { DisplaySpinnerComponent } from './components/display-spinner/display-spinner.component';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ListaEventosComponent } from "./components/lista-eventos/lista-eventos.component";
import { DefaultNavbarComponent } from './components/default-navbar/default-navbar.component';
import { DisplayValidationComponent } from './components/display-validation/display-validation.component';

@NgModule({
    declarations: [
        ListaEventosComponent,
        DefaultNavbarComponent,
        DisplayValidationComponent,
        DisplaySpinnerComponent
    ],
    imports: [
        IonicPageModule

    ],
    exports: [
        ListaEventosComponent,
        DefaultNavbarComponent,
        DisplayValidationComponent,
        DisplaySpinnerComponent
    ],
    entryComponents: [ListaEventosComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }