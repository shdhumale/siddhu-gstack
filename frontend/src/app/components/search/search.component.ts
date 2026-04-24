import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TicketService, Ticket } from '../../core/ticket.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="space-y-6">
      <h1 class="text-2xl font-bold text-gray-900">Search Tickets</h1>
      
      <div class="relative">
        <input type="text" [(ngModel)]="searchQuery" (input)="filterTickets()"
          class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Search by name or description...">
        <svg class="absolute left-4 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </div>
      
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            @for (ticket of filteredTickets(); track ticket.id) {
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
              </tr>
            } @empty {
              <tr>
                <td colspan="4" class="px-6 py-12 text-center text-gray-500">No tickets match your search.</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class SearchComponent implements OnInit {
  tickets = signal<Ticket[]>([]);
  searchQuery = '';
  
  filteredTickets = computed(() => {
    const query = this.searchQuery.toLowerCase();
    if (!query) return this.tickets();
    return this.tickets().filter(t => 
      t.name.toLowerCase().includes(query) || 
      t.description.toLowerCase().includes(query)
    );
  });

  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    this.ticketService.getTickets().subscribe({
      next: (data) => this.tickets.set(data),
      error: (err) => console.error('Failed to load tickets', err)
    });
  }

  filterTickets() {}
}