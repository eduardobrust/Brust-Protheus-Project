import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './controllers/home/home.component';
import { TableTransportComponent } from './controllers/table-transport/table-transport.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'controllers/home', component: HomeComponent },
  { path: 'controllers/table-transport', component: TableTransportComponent }
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }