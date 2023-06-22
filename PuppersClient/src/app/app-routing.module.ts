import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { ClienteComponent } from './componentes/cliente/cliente.component';
import { PaseadorComponent } from './componentes/paseador/paseador.component'
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { DataboardComponent } from './componentes/databoard/databoard.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  {path:"dashboard",component:DashboardComponent,
  canActivate:[AuthGuard]},
  {path:"cliente",component:ClienteComponent,
  canActivate:[AuthGuard]},
  {path:"paseador",component:PaseadorComponent,
  canActivate:[AuthGuard]},
  {path:"dashboard/data",component:DataboardComponent,
  canActivate:[AuthGuard]},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"**",component:DashboardComponent,
  canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
