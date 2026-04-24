import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TicketService } from '../../core/ticket.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-ticket',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="max-w-2xl">
      <h1 class="text-2xl font-bold text-gray-900 mb-6">Create New Ticket</h1>
      
      <form (ngSubmit)="onSubmit()" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Ticket Name</label>
          <input type="text" [(ngModel)]="ticketName" name="name" required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter ticket name">
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea [(ngModel)]="ticketDescription" name="description" rows="4" required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter description"></textarea>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select [(ngModel)]="ticketStatus" name="status"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="New">New</option>
            <option value="Assigned">Assigned</option>
            <option value="Done">Done</option>
            <option value="Escalate">Escalate</option>
          </select>
        </div>
        
        <div class="flex space-x-4">
          <button type="submit"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Save
          </button>
          <a routerLink="/dashboard" class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Cancel
          </a>
        </div>
      </form>
    </div>
  `
})
export class CreateTicketComponent {
  ticketName = '';
  ticketDescription = '';
  ticketStatus: 'New' | 'Assigned' | 'Done' | 'Escalate' = 'New';

  constructor(private ticketService: TicketService, private router: Router) {}

  onSubmit() {
    this.ticketService.createTicket({
      name: this.ticketName,
      description: this.ticketDescription,
      status: this.ticketStatus
    }).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => console.error('Failed to create ticket', err)
    });
  }
}