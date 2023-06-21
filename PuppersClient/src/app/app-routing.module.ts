import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { ClienteComponent } from './componentes/cliente/cliente.component';
import { PaseadorComponent } from './componentes/paseador/paseador.component'
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { DataboardComponent } from './componentes/databoard/databoard.component';
const routes: Routes = [
  {path:"dashboard",component:DashboardComponent},
  {path:"cliente",component:ClienteComponent},
  {path:"paseador",component:PaseadorComponent},
  {path:"dashboard/data",component:DataboardComponent},
  {path:"login",component:LoginComponent},
  {path:"Register",component:RegisterComponent},
  {path:"**",component:DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
