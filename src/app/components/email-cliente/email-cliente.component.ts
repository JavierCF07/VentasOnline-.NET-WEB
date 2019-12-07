import { Component, OnInit } from '@angular/core';
import { EmailCliente } from './email-cliente';
import { EmailClienteService } from '../services/email-cliente.service';
import { ModalProductoService } from '../services/modal/modal-producto.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-email-cliente',
  templateUrl: './email-cliente.component.html',
  styleUrls: ['./email-cliente.component.css']
})
export class EmailClienteComponent implements OnInit {
  emailClientes: EmailCliente[] = [];
  emailSeleccionado: EmailCliente;
  tipo: string;
  paginador: any;

  constructor(
    private emailService: EmailClienteService,
    private ModalClienteService: ModalProductoService,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = + params.get('page');
      if (!page) {
        page = 0;
      }
      this.emailService.getEmailClientesPage(page).subscribe((
        response: any)=> {
          this.emailClientes = response.content as EmailCliente[];
          this.paginador = response;
        });
    });
    this.ModalClienteService.notificarCambio.subscribe(emailCliente => {
      if (this.tipo === 'new') {
        this.emailClientes.push(emailCliente);
      } else if (this.tipo === 'update') {
        this.emailClientes = this.emailClientes.map(emailClienteOriginal => {
          if (emailCliente.codigoEmail === emailClienteOriginal.codigoEmail) {
            emailClienteOriginal = emailCliente;
          }
          return emailClienteOriginal;
        });
      }
    });
  }

  delete(emailCliente: EmailCliente): void {
    Swal.fire({
      title: 'Eliminar registro',
      text: 'Esta seguro de eliminar el registro?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#D33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      confirmButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      this.emailService.delete(emailCliente.codigoEmail).subscribe(
        () => {
          this.emailClientes = this.emailClientes.filter(ema => ema !== emailCliente);
          Swal.fire('Email eliminada', `Email del cliente ${emailCliente.email} eliminada correctamente`, 'success');
        }
      );
    });
  }

  abrirModal(emailCliente?: EmailCliente) {
    if (emailCliente) {
      this.emailSeleccionado = emailCliente;
      this.tipo = 'update';
    } else {
      this.tipo = 'new';
      this.emailSeleccionado = new EmailCliente();
    }
    this.ModalClienteService.abrirModal();
  }
}
