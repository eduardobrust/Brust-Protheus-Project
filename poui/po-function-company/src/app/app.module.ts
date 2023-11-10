import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PoDynamicModule, PoFieldModule, PoModalModule, PoModule, PoPageModule, PoTableModule } from '@po-ui/ng-components';
import { PoPageDynamicSearchModule, PoPageDynamicTableModule, PoTemplatesModule } from '@po-ui/ng-templates';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicTableComponent } from './controllers/dynamic-table/dynamic-table.component';
import { DynamicTable2Component } from './controllers/dynamic-table2/dynamic-table2.component';
import { DynamicTable3Component } from './controllers/dynamic-table3/dynamic-table3.component';
import { HomeComponent } from './controllers/home/home.component';
import { TableBasicComponent } from './controllers/table-basic/table-basic.component';
import { TableTransportComponent } from './controllers/table-transport/table-transport.component';
import { PoPageDynamicEditModule } from '@po-ui/ng-templates';

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
    PoPageDynamicEditModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
