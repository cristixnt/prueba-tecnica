import { ignoreElements } from 'rxjs';

export class Usuario {
  id?: number;
  nombre?: string = '';
  apellido: string = '';
  cedula?: number;
  username: string = '';
  estado?: boolean;
  fechaCreacion?: Date;
  fechaModificacion?: Date;
  fechaEliminacion?: Date;
    
}
