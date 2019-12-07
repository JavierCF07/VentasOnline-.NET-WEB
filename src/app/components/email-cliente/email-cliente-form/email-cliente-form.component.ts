import { Component, OnInit, Input } from '@angular/core';
import { EmailCliente } from '../email-cliente';
import { EmailClienteService } from '../../services/email-cliente.service';
import { Router } from '@angular/router';
import { ModalProductoService } from '../../services/modal/modal-producto.service';
import { EmailClienteCreacionDTO } from '../email-cliente-creacion-dto';
import { Clientes } from '../../clientes/clientes';
import { ClientesService } from '../../services/clientes.service';
import Swal from 'sweetalert2';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-email-cliente-form',
  templateUrl: './email-cliente-form.component.html',
  styleUrls: ['./email-cliente-form.component.css']
})
export class EmailClienteFormComponent implements OnInit {
  titulo: string;
  mensaje: string;
  @Input() emailCliente: EmailCliente;

  emailClientes: EmailCliente[] = [];
  clientes: Clientes[] = [];

  constructor(
    private emailService: EmailClienteService,
    private clientesService: ClientesService,
    private router: Router,
    private modalEmailService: ModalProductoService
  ) { this.titulo = 'Agregar Email del Cliente'; }

  ngOnInit() {
    this.clientesService.getClientes().subscribe(cliente => this.clientes = cliente as Clientes[]);
    this.emailService.getEmailClientes().subscribe(email => this.emailClientes = email as EmailCliente[]);
  }

  create(): void {
    const nuevo = new EmailClienteCreacionDTO();
    nuevo.email = this.emailCliente.email;
    nuevo.nombre = this.emailCliente.clientes.nombre;
    this.emailService.create(nuevo).subscribe(
      emailCliente => {
        Swal.fire('Nuevo email del cliente', `El email del cliente ${this.emailCliente.email} ha sido creado con exito`, 
          'success');
        this.modalEmailService.notificarCambio.emit(emailCliente);
        this.modalEmailService.cerrarModal();
        this.router.navigate(['/emailCliente']);
      },
      error => {
        this.mensaje = 'The description field is required';
        if (this.mensaje) {
          Swal.fire('Nuevo email del cliente', 'No puede dejar los campos vacios', 'error');
        }
      }
    );
  }
}
