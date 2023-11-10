import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../environments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private url = 'Usuarios';

  constructor(private http: HttpClient) {}

  public getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(
      `${environment.apiUrl}/${this.url}/GetUsuarios`
    );
  }

  public getUsuariosFilter(userFilter: any): Observable<Usuario[]> {
    return this.http.post<Usuario[]>(
      `${environment.apiUrl}/${this.url}/GetUsuariosByFilter`,  userFilter);
  }

  public updateUsuario(usuario: Usuario): Observable<Usuario[]> {
    return this.http.put<Usuario[]>(
      `${environment.apiUrl}/${this.url}/UpdateUsuario`, usuario
    );
  }

  public createUsuario(usuario: Usuario): Observable<Usuario[]> {
    return this.http.post<Usuario[]>(
      `${environment.apiUrl}/${this.url}/CreateUsuario`, usuario
    );
  }

  public deleteUsuario(usuario: Usuario): Observable<Usuario[]> {
    return this.http.delete<Usuario[]>(
      `${environment.apiUrl}/${this.url}/DeleteUsuario/${usuario.id}`
    );
  }
}
