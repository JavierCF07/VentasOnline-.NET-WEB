import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../services/clientes.service';
import { Clientes } from './clientes';
import { ModalProductoService } from '../services/modal/modal-producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: Clientes[] = [];
  clienteSeleccionado: Clientes;
  tipo: string;

  constructor(private clientesService: ClientesService, private ModalClienteService: ModalProductoService) {
    this.clientesService.getClientes().subscribe((response: any) => {
      this.clientes = response;
    });
   }

  ngOnInit() {
    this.ModalClienteService.notificarCambio.subscribe(cliente => {
      if (this.tipo === 'new') {
        this.clientes.push(cliente);
      } else if (this.tipo === 'update') {
        this.clientes = this.clientes.map(clienteOriginal => {
          if (cliente.nit === clienteOriginal.nit) {
            clienteOriginal = cliente;
          }
          return clienteOriginal;
        });
      }
    });
  }

  delete(cliente: Clientes): void {
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
      this.clientesService.delete(cliente.nit).subscribe(
        () => {
          this.clientes = this.clientes.filter(client => client !== cliente);
          Swal.fire('Cliente eliminada', `Cliente ${cliente.nombre} ha sido creado exitosamente!`, 'success');
        }
      );
    });
  }

  abrirModal(clientes?: Clientes) {
    if (clientes) {
      this.clienteSeleccionado = clientes;
      this.tipo = 'update';
    } else {
      this.tipo = 'new',
      this.clienteSeleccionado = new Clientes();
    }
    this.ModalClienteService.abrirModal();
  }
}

