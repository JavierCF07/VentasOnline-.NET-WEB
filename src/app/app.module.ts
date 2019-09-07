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
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
