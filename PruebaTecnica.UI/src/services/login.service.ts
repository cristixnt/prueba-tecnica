import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../environments/enviroment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = 'Login';

  constructor(private cookies: CookieService, private http: HttpClient) {}

  public setToken(token: JSON) {
    this.cookies.set('token', JSON.stringify(token));
  }

  public getToken() {
    var token = this.cookies.get('token');
    if (token.length == 0) {
      return null;
    } else {
      return token;
    }
  }

  public login(user: any): Observable<any> {
    return this.http.post<boolean>(`${environment.apiUrl}/${this.url}`, user);
  }

  public logOut() {
    sessionStorage.clear();
    localStorage.clear();
    this.cookies.deleteAll();
    return null;
  }
}
