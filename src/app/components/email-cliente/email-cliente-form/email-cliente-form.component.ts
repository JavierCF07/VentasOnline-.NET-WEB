import { Component, OnInit, Input } from '@angular/core';
import { EmailCliente } from '../email-cliente';
import { EmailClienteService } from '../../services/email-cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
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
    private modalEmailService: ModalProductoService,
    private activatedRoute: ActivatedRoute
  ) { this.titulo = 'Agregar Email del Cliente'; }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = + params.get('page');
      if (!page) {
        page = 0;
      }
      this.emailService.getEmailClientesPage(page).subscribe((
        response: any) => {
        this.emailClientes = response.content as EmailCliente[];
      });
    });
    this.clientesService.getClientes().subscribe(cliente => this.clientes = cliente as Clientes[]);
  }

  create(): void {
    const nuevo = new EmailClienteCreacionDTO();
    nuevo.email = this.emailCliente.email;
    nuevo.nit = this.emailCliente.clientes.nit;
    this.emailService.create(nuevo).subscribe(
      emailCliente => {
        Swal.fire('Nuevo email del cliente', `El email del cliente ${this.emailCliente.email} ha sido creado con exito`,
          'success');
        // emailCliente.clientes = this.emailCliente.nit;
        this.modalEmailService.notificarCambio.emit(emailCliente);
        this.modalEmailService.cerrarModal();
        this.router.navigate(['/emailCliente']);
      },
      error => {
        this.mensaje = 'The description field is required';
        console.log(nuevo);
        if (this.mensaje) {
          Swal.fire('Nuevo email del cliente', 'No puede dejar los campos vacios', 'error');
        }
      }
    );
  }

  update(): void {
    const nuevo = new EmailClienteCreacionDTO();
    nuevo.email = this.emailCliente.email;
    nuevo.nit = this.emailCliente.clientes.nit;
    this.emailService.update(this.emailCliente.codigoEmail, nuevo).subscribe(
      () => {
        Swal.fire('Actualizar email del cliente', `El email del cliente ${nuevo.email} ha sido actualizado`,
          'success');
        this.modalEmailService.notificarCambio.emit(this.emailCliente);
        this.modalEmailService.cerrarModal();
        this.router.navigate(['/emailClientes']);
      }
    );
  }

  cerrarModal(): void {
    this.modalEmailService.cerrarModal();
  }

  compararEmailCliente(o1: EmailCliente, o2: EmailCliente): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ?
      false : o1.codigoEmail === o2.codigoEmail;
  }
}
