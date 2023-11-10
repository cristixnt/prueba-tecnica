import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from '../components/login/login.component';
import { UsuarioComponent } from '../components/usuario/usuario.component';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    UsuarioComponent,
    LoginComponent,
  ],
})
export class AppComponent {
  title = 'PruebaTecnica.UI';
  token?: any = null;
  logged: Boolean = false;

  constructor(private loginService: LoginService, public router: Router) {}

  ngOnInit(): void {
    this.updateToken();
  }

  updateToken() {
    this.token = this.loginService.getToken();
    if (this.token == null) {
      this.logged = false;
    } else {
      this.logged = true;
    }
  }

  cerrarSesion() {
    this.token = this.loginService.logOut();
    this.updateToken();
  }
}
