import { CadastroPageModule } from './../pages/cadastro/cadastro.module';
import { NoticiaDetalhePageModule } from './../pages/noticias/detalhe/noticia-detalhe.module';
import { RankingPageModule } from './../pages/ranking/ranking.module';
import { ProximosEventosPageModule } from './../pages/eventos/proximos/proximos-eventos.module';
import { EventosRealizadosPageModule } from './../pages/eventos/realizados/eventos-realizados.module';

import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';

import { TabsPageModule } from '../pages/tabs/tabs.module';
import { HttpClientModule } from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PerfilPageModule } from "../pages/perfil/perfil.module";
import { ContatosPageModule } from "../pages/contatos/contatos.module";
import { LoginPageModule } from "../pages/login/login.module";
import { CoreModule } from "../core/core.module";
import { NoticiasPageModule } from "../pages/noticias/lista/noticias-lista.module";
import { DetalheEventoPageModule } from "../pages/eventos/detalhe/detalhe-evento.module";
import { HomePageModule } from "../pages/home/home.module";
import { NivelPagePageModule } from "../pages/eventos/nivel/nivel.module";
import { PontuacaoPageModule } from "../pages/pontuacao/pontuacao.module";
import { FornecedoresPageModule } from "../pages/fornecedores/fornecedores.module";
import { PerfilVisualizarPageModule } from "../pages/perfil-visualizar/perfil-visualziar.module";
import { ParametrosPageModule } from '../pages/parametros/parametros.module';

@NgModule({
  declarations: [
    MyApp

  ],
  imports: [
    BrowserModule,
    CoreModule,
    DetalheEventoPageModule,
    ProximosEventosPageModule,
    EventosRealizadosPageModule,
    RankingPageModule,
    PerfilPageModule,
    NivelPagePageModule,
    ContatosPageModule,
    NoticiasPageModule,
    LoginPageModule,
    CadastroPageModule,
    TabsPageModule,
    PontuacaoPageModule,
    FornecedoresPageModule,
    NoticiaDetalhePageModule,

    ParametrosPageModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      iconMode: 'md',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'bottom',
      pageTransition: 'ios-transition'
    }),
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp

  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }

  ]
})
export class AppModule { }
