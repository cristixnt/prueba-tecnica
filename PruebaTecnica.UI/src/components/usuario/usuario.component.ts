import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { EditUsuarioComponent } from '../edit-usuario/edit-usuario.component';
import { FormsModule } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, EditUsuarioComponent, FormsModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css',
})
export class UsuarioComponent {
  nombreFiltro?: string;
  cedulaFiltro?: number;
  usuarios: Usuario[] = [];
  usuarioToEdit?: Usuario;
  @Input() mostrarForm?: boolean;
  constructor(private UsuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.UsuarioService.getUsuarios().subscribe(
      (result: Usuario[]) => (this.usuarios = result)
    );
  }

  borrarFiltro() {
    this.UsuarioService.getUsuarios().subscribe(
      (result: Usuario[]) => (this.usuarios = result)
    );
  }

  filtrarUsuarios() {
    if (this.cedulaFiltro == undefined && (this.nombreFiltro == undefined || this.nombreFiltro == "")) {
      alert('Primero es necesario digitar algún filtro');
    } else {
      var userFilter = {
        cedula: this.cedulaFiltro == undefined ? 0 : this.cedulaFiltro,
        nombreCompleto: this.nombreFiltro == undefined ? '' : this.nombreFiltro,
      };
      this.UsuarioService.getUsuariosFilter(userFilter)
        .pipe(
          catchError((error) => {
            alert(`Error: ${error.error}`);
            return of([]);
          })
        )
        .subscribe((result: Usuario[]) => (this.usuarios = result));
    }
  }
  calcelarEdit() {
    this.mostrarForm = true;
  }

  updateUsuariosList(usuarios: Usuario[]) {
    this.usuarios = usuarios;
  }

  initNewUsuario() {
    this.mostrarForm = true;
    this.usuarioToEdit = new Usuario();
  }

  editUsuario(usuario: Usuario) {
    this.mostrarForm = true;
    this.usuarioToEdit = usuario;
  }
}
