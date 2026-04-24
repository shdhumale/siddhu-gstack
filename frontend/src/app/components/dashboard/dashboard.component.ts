import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService, Ticket } from '../../core/ticket.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
        <a routerLink="/create" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Create Ticket
        </a>
      </div>
      
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            @for (ticket of tickets(); track ticket.id) {
              <tr class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{{ ticket.id }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ ticket.name }}</td>
                <td class="px-6 py-4 text-sm text-gray-500">{{ ticket.description }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 py-1 text-xs font-semibold rounded-full"
                    [class.bg-blue-100]="ticket.status === 'New'"
                    [class.text-blue-800]="ticket.status === 'New'"
                    [class.bg-yellow-100]="ticket.status === 'Assigned'"
                    [class.text-yellow-800]="ticket.status === 'Assigned'"
                    [class.bg-green-100]="ticket.status === 'Done'"
                    [class.text-green-800]="ticket.status === 'Done'"
                    [class.bg-red-100]="ticket.status === 'Escalate'"
                    [class.text-red-800]="ticket.status === 'Escalate'">
                    {{ ticket.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                  <button (click)="editTicket(ticket)" class="text-blue-600 hover:text-blue-900">Edit</button>
                  <button (click)="deleteTicket(ticket.id!)" class="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            } @empty {
              <tr>
                <td colspan="5" class="px-6 py-12 text-center text-gray-500">No tickets found. Create your first ticket!</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  tickets = signal<Ticket[]>([]);

  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    this.loadTickets();
  }

  loadTickets() {
    this.ticketService.getTickets().subscribe({
      next: (data) => this.tickets.set(data),
      error: (err) => console.error('Failed to load tickets', err)
    });
  }

  editTicket(ticket: Ticket) {
    console.log('Edit ticket', ticket);
  }

  deleteTicket(id: number) {
    if (confirm('Are you sure you want to delete this ticket?')) {
      this.ticketService.deleteTicket(id).subscribe({
        next: () => this.loadTickets(),
        error: (err) => console.error('Failed to delete ticket', err)
      });
    }
  }
}