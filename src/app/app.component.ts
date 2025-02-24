import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent,
  RouterOutlet,
} from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatList, MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DelayService } from './delay.service';
import { AuthService } from './auth.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  imports: [
    MatSidenavModule,
    MatButtonModule,
    RouterOutlet,
    MatListModule,
    MatIconModule,
    MatProgressBarModule,
    MatSnackBarModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'hirdetesszar';
  @ViewChild('progressBar') progressBar!: ElementRef;
  progressBarValue: number;
  szar = '( =ω=)..nyaa';
  isAuthed: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly delayService: DelayService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly authService: AuthService
  ) {
    this.progressBarValue = 0;
    this.delayService.percentageChanged.subscribe((x) => {
      this.progressBarValue = x;
    });
    this.authService.loginStateChange.subscribe(val => {
      this.isAuthed = val;
    })

    // this.activatedRoute.title.subscribe(x => this.szar = x!);
  }

  navigateTo(target: string) {
    this.router.navigateByUrl(target);
  }

  logout() {
    this.delayService.do(() => {
      this.authService.logout();
    }, 1000);
  }
}
