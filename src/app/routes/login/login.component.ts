import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../auth.service';
import { DelayService } from '../../delay.service';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private readonly authService: AuthService, private readonly delayService: DelayService, private readonly apiService: ApiService) {}

  email: string = '';
  password: string = '';

  click() {
    this.delayService.do(async () => {
      const res = await this.apiService.post<{ token: string }>('users/login', {
        email: this.email,
        password: this.password
      });

      this.authService.login(res.data.token);
    }, 1000);
  }
}
