import { Proveedores } from '../proveedores/proveedores';

export class Compras {
    idCompra: number;
    numeroDocumento: number;
    codigoProveedor: number;
    proveedores: Proveedores;
    fecha: Date;
    total: number;
}
