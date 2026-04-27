import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TicketService, Ticket } from '../../core/ticket.service';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-ticket',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="max-w-2xl">
      <h1 class="text-2xl font-bold text-gray-900 mb-6">{{ isEdit ? 'Edit Ticket' : 'Create New Ticket' }}</h1>
      
      <form (ngSubmit)="onSubmit()" class="space-y-6">
        <div *ngIf="isEdit">
          <label class="block text-sm font-medium text-gray-700 mb-2">Ticket ID</label>
          <input type="text" [value]="ticketId" disabled
            class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500">
        </div>

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
            {{ isEdit ? 'Update' : 'Save' }}
          </button>
          <a routerLink="/dashboard" class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Cancel
          </a>
        </div>
      </form>
    </div>
  `
})
export class CreateTicketComponent implements OnInit {
  ticketId: number | null = null;
  ticketName = '';
  ticketDescription = '';
  ticketStatus: 'New' | 'Assigned' | 'Done' | 'Escalate' = 'New';
  isEdit = false;
  currentTicket: Ticket | null = null;

  constructor(
    private ticketService: TicketService, 
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.ticketId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.ticketId) {
      this.isEdit = true;
      this.loadTicket(this.ticketId);
    }
  }

  loadTicket(id: number) {
    this.ticketService.getTicket(id).subscribe({
      next: (ticket) => {
        this.currentTicket = ticket;
        this.ticketName = ticket.name;
        this.ticketDescription = ticket.description;
        this.ticketStatus = ticket.status as any;
      },
      error: (err) => console.error('Failed to load ticket', err)
    });
  }

  onSubmit() {
    const payload: Ticket = {
      name: this.ticketName,
      description: this.ticketDescription,
      status: this.ticketStatus
    };

    if (this.isEdit && this.ticketId) {
      payload.id = this.ticketId;
      payload.version = this.currentTicket?.version; // Maintain version for optimistic locking
      this.ticketService.updateTicket(this.ticketId, payload).subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: (err) => console.error('Failed to update ticket', err)
      });
    } else {
      this.ticketService.createTicket(payload).subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: (err) => console.error('Failed to create ticket', err)
      });
    }
  }
}