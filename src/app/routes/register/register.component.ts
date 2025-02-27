import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DelayService } from '../../delay.service';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(
    private readonly router: Router,
    private readonly apiService: ApiService,
    private readonly delayService: DelayService,
  ) {}

  email: string = '';
  name: string = '';
  address: string = '';
  password: string = '';

  async click() {
    await this.apiService.post<{ token: string }>('users/register', {
      name: this.name,
      address: this.address,
      email: this.email,
      password: this.password
    });

    this.delayService.do(() => {
      this.router.navigateByUrl('/login');
     }, 1000);
  }
}
