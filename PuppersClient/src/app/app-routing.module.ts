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
import { EditClienteComponent } from './componentes/edit-cliente/edit-cliente.component';
import { EditPaseadorComponent } from './componentes/edit-paseador/edit-paseador.component';
import { EditMascotaComponent } from './componentes/edit-mascota/edit-mascota.component';
import { CreateMascotaComponent } from './componentes/create-mascota/create-mascota.component';
import { CreatePaseadorComponent } from './componentes/create-paseador/create-paseador.component';
import { CreateClienteComponent } from './componentes/create-cliente/create-cliente.component';
const routes: Routes = [
  {path:"dashboard",component:DashboardComponent, canActivate:[AdminGuard]},
  {path:"manageboard",component:ManageboardComponent,canActivate:[AdminGuard]},
  {path:"adminCliente/:id",component:AdminClienteComponent,canActivate:[AdminGuard]},
  {path:"adminPaseador/:id",component:AdminPaseadorComponent,canActivate:[AdminGuard]},
  {path:"adminMascota/:id",component:AdminMascotaComponent,canActivate:[AdminGuard]},
  {path:"editCliente/:id",component:EditClienteComponent,canActivate:[AdminGuard]},
  {path:"editPaseador/:id",component:EditPaseadorComponent,canActivate:[AdminGuard]},
  {path:"editMascota/:id",component:EditMascotaComponent,canActivate:[AdminGuard]},
  {path:"addMascota",component:CreateMascotaComponent,canActivate:[AdminGuard]},
  {path:"addPaseador",component:CreatePaseadorComponent,canActivate:[AdminGuard]},
  {path:"addCliente",component:CreateClienteComponent,canActivate:[AdminGuard]},
  {path:"cliente/:id", component: ClienteComponent, canActivate:[ClienteGuard] },
  {path:"paseador",component:PaseadorComponent, canActivate:[PaseadorGuard]},
  {path:"databoard",component:DataboardComponent, canActivate:[AdminGuard]},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"homecliente",component:HomeclienteComponent, canActivate:[ClienteGuard]},
  {path:"paseadorprofile/:id/:pet",component:PaseadorprofileComponent, canActivate:[ClienteGuard]},
  {path:"**",component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
