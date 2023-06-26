import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { ClienteComponent } from './componentes/cliente/cliente.component';
import { PaseadorComponent } from './componentes/paseador/paseador.component'
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { DataboardComponent } from './componentes/databoard/databoard.component';
import { HomeclienteComponent } from './componentes/homecliente/homecliente.component';
import { PaseadorprofileComponent } from './componentes/paseadorprofile/paseadorprofile.component';
import { PaseadorGuard } from './servicios/paseador.guard';
import { AdminGuard } from './servicios/admin.guard';
import { ClienteGuard } from './servicios/cliente.guard';
import { ManageboardComponent } from './componentes/manageboard/manageboard.component';
import { AdminClienteComponent } from './componentes/admin-cliente/admin-cliente.component';
import { AdminPaseadorComponent } from './componentes/admin-paseador/admin-paseador.component';
import { AdminMascotaComponent } from './componentes/admin-mascota/admin-mascota.component';
const routes: Routes = [
  {path:"dashboard",component:DashboardComponent, canActivate:[AdminGuard]},
  {path:"manageboard",component:ManageboardComponent,canActivate:[AdminGuard]},
  {path:"adminCliente/:id",component:AdminClienteComponent,canActivate:[AdminGuard]},
  {path:"adminPaseador/:id",component:AdminPaseadorComponent,canActivate:[AdminGuard]},
  {path:"adminMascota/:id",component:AdminMascotaComponent,canActivate:[AdminGuard]},
  { path: "cliente/:id", component: ClienteComponent, canActivate:[ClienteGuard] },
  {path:"paseador",component:PaseadorComponent, canActivate:[PaseadorGuard]},
  {path:"databoard",component:DataboardComponent, canActivate:[AdminGuard]},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"homecliente",component:HomeclienteComponent, canActivate:[ClienteGuard]},
  {path:"paseadorprofile/:id",component:PaseadorprofileComponent, canActivate:[ClienteGuard]},
  {path:"**",component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
