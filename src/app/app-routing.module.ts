import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { TipoEmpaquesComponent } from './components/tipo-empaques/tipo-empaques.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './components/login/guards/authguard.guard';
import { ProductosComponent } from './components/productos/productos.component';
import { ProductoFormComponent } from './components/productos/producto-form/producto-form.component';
import { EmailClienteComponent } from './components/email-cliente/email-cliente.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'categoria', component: CategoriasComponent, canActivate: [AuthGuard]},
  {path: 'categoria/page/:page', component: CategoriasComponent, canActivate: [AuthGuard]},
  {path: 'tipoEmpaque', component: TipoEmpaquesComponent, canActivate: [AuthGuard]},
  {path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard]},
  {path: 'proveedores', component: ProveedoresComponent, canActivate: [AuthGuard]},
  {path: 'email', component: EmailClienteComponent, canActivate: [AuthGuard]},
  {path: 'productos', component: ProductosComponent, canActivate: [AuthGuard]},
  {path: 'productoForm', component: ProductoFormComponent, canActivate: [AuthGuard]},
  {path: 'productoForm/:id', component: ProductoFormComponent, canActivate: [AuthGuard]},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
