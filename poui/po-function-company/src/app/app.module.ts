import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PoModule } from '@po-ui/ng-components';
import { PoPageDynamicTableModule, PoTemplatesModule } from '@po-ui/ng-templates';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicTableComponent } from './controllers/dynamic-table/dynamic-table.component';
import { HomeComponent } from './controllers/home/home.component';
import { DynamicTable2Component } from './controllers/dynamic-table2/dynamic-table2.component';
import { DynamicTable3Component } from './controllers/dynamic-table3/dynamic-table3.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DynamicTableComponent,
    DynamicTable2Component,
    DynamicTable3Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    PoTemplatesModule,
    PoPageDynamicTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
