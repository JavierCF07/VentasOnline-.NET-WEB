import { Component, OnInit, Input } from '@angular/core';
import { Clientes } from '../clientes';
import { ClientesService } from '../../services/clientes.service';
import { Router } from '@angular/router';
import { ModalProductoService } from '../../services/modal/modal-producto.service';
import { ClienteCreacionDTO } from '../cliente-creacion-dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {
  titulo: string;
  mensaje: string;
  @Input() cliente: Clientes;

  clientes: Clientes[];

  constructor(
    private clienteService: ClientesService,
    private router: Router,
    private modalClienteService: ModalProductoService,
  ) { this.titulo = 'Agregar Cliente'; }

  ngOnInit() {
    this.clienteService.getClientes().subscribe(cliente => this.clientes = cliente as Clientes[]);
  }

  create(): void {
    const nuevo = new ClienteCreacionDTO();
    nuevo.DPI = this.cliente.DPI;
    nuevo.nombre = this.cliente.nombre;
    nuevo.direccion = this.cliente.direccion;
    this.clienteService.create(nuevo).subscribe(
      cliente => {
        Swal.fire('Nuevo cliente', `El cliente ${this.cliente.nombre} ha sido creado correctamente`, 'success');
        this.modalClienteService.notificarCambio.emit(cliente);
        this.modalClienteService.cerrarModal();
        this.router.navigate(['/clientes']);
      },
      error => {
        this.mensaje = 'The description field is required';
        if (this.mensaje) {
          Swal.fire('Nuevo cliente', 'No puede dejar campos vacios o incompletos', 'error');
        }
      }
    );
  }

  update(): void {
    const nuevo = new ClienteCreacionDTO();
    nuevo.DPI = this.cliente.DPI;
    nuevo.nombre = this.cliente.nombre;
    nuevo.direccion = this.cliente.direccion;
    this.clienteService.update(this.cliente.nit, nuevo).subscribe(
      () => {
        Swal.fire('Actualizar cliente', `El cliente ${nuevo.nombre} ha sido actualizado correctamente`, 'success');
        this.modalClienteService.notificarCambio.emit(this.cliente);
        this.modalClienteService.cerrarModal();
        this.router.navigate(['/clientes']);
      }
    );
  }

  cerrarModal(): void {
    this.modalClienteService.cerrarModal();
  }
}
