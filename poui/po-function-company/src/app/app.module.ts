import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PoModule, PoTableModule } from '@po-ui/ng-components';
import { PoPageDynamicTableModule, PoTemplatesModule } from '@po-ui/ng-templates';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicTableComponent } from './controllers/dynamic-table/dynamic-table.component';
import { DynamicTable2Component } from './controllers/dynamic-table2/dynamic-table2.component';
import { DynamicTable3Component } from './controllers/dynamic-table3/dynamic-table3.component';
import { HomeComponent } from './controllers/home/home.component';
import { TableTransportComponent } from './controllers/table-transport/table-transport.component';
import { TableBasicComponent } from './controllers/table-basic/table-basic.component';
import { PoPageModule } from '@po-ui/ng-components';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DynamicTableComponent,
    DynamicTable2Component,
    DynamicTable3Component,
    TableTransportComponent,
    TableBasicComponent
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
    PoPageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
