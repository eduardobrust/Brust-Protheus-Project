import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PoDynamicModule, PoFieldModule, PoModalModule, PoModule, PoPageModule, PoTableModule } from '@po-ui/ng-components';
import { PoPageDynamicEditModule, PoTemplatesModule } from '@po-ui/ng-templates';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './controllers/home/home.component';
import { TableTransportComponent } from './controllers/table-transport/table-transport.component';
import { Router } from '@angular/router';

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
HttpClientModule,
RouterModule.forRoot([]),
PoTemplatesModule,
PoTableModule,
PoPageModule,
PoFieldModule,
PoDynamicModule,
PoModalModule,
PoPageDynamicEditModule,
FormsModule,
ReactiveFormsModule
],
providers: [
  {
    provide: Router,
    useClass: Router
  }
],
bootstrap: [AppComponent]
})
export class AppModule { }