import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PoDynamicModule, PoFieldModule, PoModalModule, PoModule, PoPageModule, PoTableModule, PoI18nModule, PoI18nConfig } from '@po-ui/ng-components';
import { PoPageDynamicEditModule, PoTemplatesModule } from '@po-ui/ng-templates';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './controllers/home/home.component';
import { TableTransportComponent } from './controllers/table-transport/table-transport.component';

// Defina os literais para os idiomas suportados
const i18nLiterals = {
  pt: {
    welcome: 'Bem-vindo',
    // Adicione outros literais conforme necessário
  },
  en: {
    welcome: 'Welcome',
    // Adicione outros literais conforme necessário
  },
  es: {
    welcome: 'Bienvenido',
    // Adicione outros literais conforme necessário
  }
};

// Configuração do PoI18n
const i18nConfig: PoI18nConfig = {
  default: {
    language: 'pt', // Idioma padrão
    context: 'general', // Contexto padrão
  },
  contexts: {
    general: i18nLiterals // Literais para o contexto 'general'
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TableTransportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    RouterModule.forRoot([]),
    PoTemplatesModule,
    PoTableModule,
    PoPageModule,
    PoFieldModule,
    PoDynamicModule,
    PoModalModule,
    PoPageDynamicEditModule,
    FormsModule,
    ReactiveFormsModule,
    PoI18nModule.config(i18nConfig) // Configura o PoI18nModule com a configuração
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    // Remova o { provide: I18N_CONFIG, useValue: i18nConfig } daqui
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }