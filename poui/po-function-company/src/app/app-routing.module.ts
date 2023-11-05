import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynamicTableComponent } from './controllers/dynamic-table/dynamic-table.component'; 
import { AppComponent } from './app.component'; 

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {path: 'home', component: AppComponent},
  {path: 'dynamic-table', component: DynamicTableComponent}
 // {path: 'component2', component: Component2Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }