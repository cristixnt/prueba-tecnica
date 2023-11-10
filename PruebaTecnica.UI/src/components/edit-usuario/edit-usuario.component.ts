import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../models/usuario';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-edit-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-usuario.component.html',
  styleUrl: './edit-usuario.component.css',
})
export class EditUsuarioComponent implements OnInit {
  @Input() usuario?: Usuario;
  @Output() usuariosUpdated = new EventEmitter<Usuario[]>();
  @Output() onCallParent: EventEmitter<void> = new EventEmitter();

  callParent(): void {
    this.onCallParent.emit();
  }

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {}

  updateUsuario(usuario: Usuario) {
    this.validateUsuario(usuario);
    this.usuarioService
      .updateUsuario(usuario)
      .subscribe((usuarios: Usuario[]) => {
        this.usuario = new Usuario();
        this.usuariosUpdated.emit(usuarios);
        alert("Usuario editado.");
      });
  }

  deleteUsuario(usuario: Usuario) {
    this.usuarioService
      .deleteUsuario(usuario)
      .subscribe((usuarios: Usuario[]) => {
        this.usuario = new Usuario();
        this.usuariosUpdated.emit(usuarios);
        alert("Usuario eliminado.");
      });
  }

  public validateUsuario(usuario: Usuario): void {
    console.log(usuario);
    try {
      if (usuario.nombre == '') {
        throw 'Campo {nombre} inválido.';
      }
      if (usuario.apellido == '') {
        throw 'Campo {apellido} inválido.';
      }
      if (usuario.cedula != undefined) {
        if (
          usuario.cedula.toString().length > 10 ||
          usuario.cedula > 999999999
        ) {
          throw 'Campo {cedula} inválido.';
        }
      } else {
        throw 'Campo {cedula} inválido.';
      }
      if (usuario.username == '') {
        throw 'Campo {username} inválido.';
      }
    } catch (error) {
      alert(error);
    }
  }

  createUsuario(usuario: Usuario) {
    this.validateUsuario(usuario);
    this.usuarioService
      .createUsuario(usuario)
      .subscribe((usuarios: Usuario[]) => {
        this.usuario = new Usuario();
        this.usuariosUpdated.emit(usuarios);
        alert("Usuario agregado.");
      });
  }
}
