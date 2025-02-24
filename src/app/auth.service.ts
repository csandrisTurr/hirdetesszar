import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, bufferToggle } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  @Output() loginStateChange: BehaviorSubject<boolean>;
  TOKEN_KEY = 'token';

  constructor() {
    this.loginStateChange = new BehaviorSubject(this.isLoggedIn());
  }

  login(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.loginStateChange.next(true);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.loginStateChange.next(false);
  }

  isLoggedIn() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
