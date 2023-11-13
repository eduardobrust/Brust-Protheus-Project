import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PoDynamicModule, PoFieldModule, PoModalModule, PoModule, PoPageModule, PoTableModule } from '@po-ui/ng-components';
import { PoPageDynamicEditModule, PoPageDynamicSearchModule, PoPageDynamicTableModule, PoTemplatesModule } from '@po-ui/ng-templates';
import { ProtheusLibCoreModule } from '@totvs/protheus-lib-core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicTableComponent } from './controllers/dynamic-table/dynamic-table.component';
import { DynamicTable2Component } from './controllers/dynamic-table2/dynamic-table2.component';
import { DynamicTable3Component } from './controllers/dynamic-table3/dynamic-table3.component';
import { HomeComponent } from './controllers/home/home.component';
import { TableBasicComponent } from './controllers/table-basic/table-basic.component';
import { TableTransportComponent } from './controllers/table-transport/table-transport.component';
import { Router } from '@angular/router';
//import { ProAppConfigService } from '@totvs/protheus-lib-core';

@NgModule({
declarations: [
AppComponent,
HomeComponent,
DynamicTableComponent,
DynamicTable2Component,
DynamicTable3Component,
TableTransportComponent,
TableBasicComponent,
],
imports: [
BrowserModule,
AppRoutingModule,
PoModule,
HttpClientModule,
RouterModule.forRoot([]),
PoTemplatesModule,
PoPageDynamicTableModule,
PoTableModule,
PoPageModule,
PoPageDynamicSearchModule,
PoFieldModule,
PoDynamicModule,
PoModalModule,
PoPageDynamicEditModule,
FormsModule,
ReactiveFormsModule,
//ProtheusLibCoreModule,
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