import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/auth.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="min-h-screen text-slate-100">
      <nav *ngIf="isLoggedIn$ | async" class="bg-white/5 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex justify-between h-16">
            <div class="flex space-x-8">
              <a routerLink="/dashboard" routerLinkActive="text-blue-400 border-b-2 border-blue-400" class="inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors hover:text-blue-300">
                Dashboard
              </a>
              <a routerLink="/create" routerLinkActive="text-blue-400 border-b-2 border-blue-400" class="inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors hover:text-blue-300">
                Create Ticket
              </a>
              <a routerLink="/search" routerLinkActive="text-blue-400 border-b-2 border-blue-400" class="inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors hover:text-blue-300">
                Search
              </a>
            </div>
            <div class="flex items-center space-x-4">
              <a routerLink="/update-password" class="text-sm text-slate-400 hover:text-slate-200 transition-colors">Settings</a>
              <button (click)="logout()" class="text-sm bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2 rounded-lg border border-red-500/20 transition-all active:scale-95">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class AppComponent {
  isLoggedIn$ = this.authService.token$.pipe(map(token => !!token));

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}