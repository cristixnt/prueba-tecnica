import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username?: string;
  password?: string;
  @Output() onCallParent: EventEmitter<void> = new EventEmitter();

  callParent(): void {
    this.onCallParent.emit();
  }

  constructor(private loginService: LoginService) {}

  onSubmit() {
    const user = { username: this.username, password: this.password };
    this.loginService
      .login(user)
      .pipe(
        catchError((error) => {
          alert(`Error: ${error.error}`);
          return of({});
        })
      )
      .subscribe((user) => {
        if (user.username != undefined) {
          this.loginService.setToken(user);
          this.callParent();
        }
      });
  }
}
