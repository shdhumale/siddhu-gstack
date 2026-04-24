import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="min-h-screen bg-gray-50">
      <nav class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex justify-between h-16">
            <div class="flex">
              <a routerLink="/dashboard" class="inline-flex items-center px-4 py-2 text-gray-700 hover:text-gray-900">
                Dashboard
              </a>
              <a routerLink="/create" class="inline-flex items-center px-4 py-2 text-gray-700 hover:text-gray-900">
                Create Ticket
              </a>
              <a routerLink="/search" class="inline-flex items-center px-4 py-2 text-gray-700 hover:text-gray-900">
                Search
              </a>
            </div>
          </div>
        </div>
      </nav>
      <main class="max-w-7xl mx-auto px-4 py-8">
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class AppComponent {}