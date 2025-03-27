import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PoDynamicModule, PoFieldModule, PoModalModule, PoModule, PoPageModule, PoTableModule } from '@po-ui/ng-components';
import { PoPageDynamicEditModule, PoTemplatesModule } from '@po-ui/ng-templates';
import { ProtheusLibCoreModule } from '@totvs/protheus-lib-core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './controllers/home/home.component';
import { TableTransportComponent } from './controllers/table-transport/table-transport.component';

@NgModule({ declarations: [
        AppComponent,
        HomeComponent,
        TableTransportComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
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
        ReactiveFormsModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }