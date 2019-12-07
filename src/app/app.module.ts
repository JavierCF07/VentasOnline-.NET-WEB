import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { TipoEmpaquesComponent } from './components/tipo-empaques/tipo-empaques.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TokenInterceptor } from './components/login/interceptors/token.interceptor';
import { ProductosComponent } from './components/productos/productos.component';
import { AuthInterceptor } from './components/login/interceptors/auth.interceptor';
import { ProductoFormComponent } from './components/productos/producto-form/producto-form.component';
import { CategoriaFormComponent } from './components/categorias/categoria-form/categoria-form.component';
import { PaginatorComponent } from './components/categorias/paginator/paginator.component';
import { TipoEmpaqueFormComponent } from './components/tipo-empaques/tipo-empaque-form/tipo-empaque-form.component';
import { ClienteFormComponent } from './components/clientes/cliente-form/cliente-form.component';
import { EmailClienteComponent } from './components/email-cliente/email-cliente.component';
import { EmailClienteFormComponent } from './components/email-cliente/email-cliente-form/email-cliente-form.component';
import { PaginatorProductoComponent } from './components/productos/paginator-producto/paginator-producto.component';
import { PaginatorTipoComponent } from './components/tipo-empaques/paginator-tipo/paginator-tipo.component';
import { ProveedoresPaginatorComponent } from './components/proveedores/proveedores-paginator/proveedores-paginator.component';
import { ProveedoresFormComponent } from './components/proveedores/proveedores-form/proveedores-form.component';
import { ComprasComponent } from './components/compras/compras.component';
import { ComprasFormComponent } from './components/compras/compras-form/compras-form.component';
import { ComprasPaginatorComponent } from './components/compras/compras-paginator/compras-paginator.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    CategoriasComponent,
    TipoEmpaquesComponent,
    HomeComponent,
    ClientesComponent,
    ProveedoresComponent,
    LoginComponent,
    ProductosComponent,
    ProductoFormComponent,
    CategoriaFormComponent,
    PaginatorComponent,
    TipoEmpaqueFormComponent,
    ClienteFormComponent,
    EmailClienteComponent,
    EmailClienteFormComponent,
    PaginatorProductoComponent,
    PaginatorTipoComponent,
    ProveedoresPaginatorComponent,
    ProveedoresFormComponent,
    ComprasComponent,
    ComprasFormComponent,
    ComprasPaginatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
