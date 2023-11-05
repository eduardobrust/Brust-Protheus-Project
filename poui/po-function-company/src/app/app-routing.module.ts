import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
  import { DynamicTableComponent } from './controllers/dynamic-table/dynamic-table.component'; 
  import { AppComponent } from './app.component'; 

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'controllers', component: DynamicTableComponent }
];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }