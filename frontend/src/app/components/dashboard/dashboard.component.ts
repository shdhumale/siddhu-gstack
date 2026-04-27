import { Component, OnInit, signal, ViewChild, ElementRef, AfterViewInit, OnDestroy, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService, Ticket } from '../../core/ticket.service';
import { RouterLink } from '@angular/router';

declare var Chart: any;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out">
      <!-- Header with Glass Gradient -->
      <div class="relative overflow-hidden bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-xl">
        <div class="relative z-10 flex justify-between items-center">
          <div>
            <h1 class="text-4xl font-extrabold tracking-tight text-white mb-2">
              System <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Overview</span>
            </h1>
            <p class="text-slate-400 text-lg">Real-time status of your support ecosystem</p>
          </div>
          <a routerLink="/create" class="group flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-xl shadow-blue-900/20 active:scale-95 transition-all">
            <svg class="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path></svg>
            Create Ticket
          </a>
        </div>
        <!-- Decorative Background Element -->
        <div class="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Main Stats & Table -->
        <div class="lg:col-span-3 space-y-8">
          <div class="glass-card overflow-hidden transition-all duration-500 hover:shadow-blue-500/5">
            <div class="px-8 py-6 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
              <h2 class="text-xl font-bold text-white flex items-center gap-3">
                <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                Active Queue
              </h2>
              <span class="text-slate-500 text-sm font-medium uppercase tracking-widest">{{ tickets().length }} Active Items</span>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full">
                <thead>
                  <tr class="bg-white/[0.03]">
                    <th class="px-8 py-5 text-left text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Ticket Identity</th>
                    <th class="px-8 py-5 text-left text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Current Status</th>
                    <th class="px-8 py-5 text-right text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Management</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-white/5">
                  @for (ticket of tickets(); track ticket.id; let i = $index) {
                    <tr class="group hover:bg-white/[0.04] transition-all duration-300">
                      <td class="px-8 py-6">
                        <div class="flex items-center gap-4">
                          <span class="text-xs font-mono text-slate-600 bg-white/5 px-2 py-1 rounded">#{{ ticket.id }}</span>
                          <div>
                            <p class="text-base font-bold text-white group-hover:text-blue-400 transition-colors">{{ ticket.name }}</p>
                            <p class="text-sm text-slate-400 mt-1 line-clamp-1 opacity-80">{{ ticket.description }}</p>
                          </div>
                        </div>
                      </td>
                      <td class="px-8 py-6 whitespace-nowrap">
                        <div class="flex items-center gap-2">
                           <span class="w-1.5 h-1.5 rounded-full ring-2 ring-offset-2 ring-offset-slate-950"
                             [ngClass]="{
                               'bg-blue-400 ring-blue-400/20': ticket.status === 'New',
                               'bg-yellow-400 ring-yellow-400/20': ticket.status === 'Assigned',
                               'bg-emerald-400 ring-emerald-400/20': ticket.status === 'Done',
                               'bg-red-400 ring-red-400/20': ticket.status === 'Escalate'
                             }"></span>
                           <span class="px-3 py-1 text-xs font-bold rounded-lg border uppercase tracking-wider"
                             [ngClass]="{
                               'bg-blue-500/10 text-blue-400 border-blue-500/30': ticket.status === 'New',
                               'bg-yellow-500/10 text-yellow-400 border-yellow-500/30': ticket.status === 'Assigned',
                               'bg-emerald-500/10 text-emerald-400 border-emerald-500/30': ticket.status === 'Done',
                               'bg-red-500/10 text-red-400 border-red-500/30': ticket.status === 'Escalate'
                             }">
                             {{ ticket.status }}
                           </span>
                        </div>
                      </td>
                      <td class="px-8 py-6 whitespace-nowrap text-right space-x-3">
                        <a [routerLink]="['/edit', ticket.id]" class="inline-flex items-center gap-1 text-sm font-bold text-slate-400 hover:text-white transition-all">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                          Edit
                        </a>
                        <button (click)="deleteTicket(ticket.id!)" class="inline-flex items-center gap-1 text-sm font-bold text-red-500/70 hover:text-red-400 transition-all">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                          Drop
                        </button>
                      </td>
                    </tr>
                  } @empty {
                    <tr>
                      <td colspan="3" class="px-8 py-24 text-center">
                        <div class="flex flex-col items-center">
                          <div class="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                            <svg class="w-10 h-10 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                          </div>
                          <p class="text-xl font-bold text-slate-400">Inbox Zero</p>
                          <p class="text-slate-500 mt-2">All caught up! Why not create a new ticket?</p>
                        </div>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Sidebar Section -->
        <div class="space-y-8">
          <!-- Chart Card -->
          <div class="glass-card p-8 flex flex-col items-center text-center">
            <div class="w-full mb-8">
              <h2 class="text-xl font-bold text-white tracking-tight">Status Metrics</h2>
              <div class="h-1 w-12 bg-blue-500 rounded-full mx-auto mt-3"></div>
            </div>
            
            <div class="relative w-full aspect-square max-w-[200px] mb-8">
              <canvas #statusChart></canvas>
              <!-- Center label -->
              <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span class="text-3xl font-black text-white">{{ tickets().length }}</span>
                <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total</span>
              </div>
            </div>

            <!-- Custom Legend -->
            <div class="w-full grid grid-cols-2 gap-3">
              @for (s of ['New', 'Assigned', 'Done', 'Escalate']; track s) {
                <div class="flex items-center gap-2 bg-white/5 p-2 rounded-xl border border-white/5">
                  <span class="w-2 h-2 rounded-full" [ngClass]="{
                    'bg-blue-400': s === 'New',
                    'bg-yellow-400': s === 'Assigned',
                    'bg-emerald-400': s === 'Done',
                    'bg-red-400': s === 'Escalate'
                  }"></span>
                  <span class="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{{ s }}</span>
                </div>
              }
            </div>
          </div>

          <!-- Secondary Stats -->
          <div class="bg-gradient-to-br from-indigo-600 to-blue-700 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group">
             <div class="relative z-10">
               <h3 class="text-white/80 font-bold uppercase tracking-widest text-[10px] mb-1">Efficiency</h3>
               <p class="text-3xl font-black text-white mb-4">High Performance</p>
               <div class="flex items-center gap-2 text-white/90 text-sm font-medium">
                 <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                 <span>{{ getActiveCount() }} bottleneck(s) detected</span>
               </div>
             </div>
             <div class="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  tickets = signal<Ticket[]>([]);
  @ViewChild('statusChart') statusChartCanvas!: ElementRef<HTMLCanvasElement>;
  chartInstance: any;

  constructor(private ticketService: TicketService) {
    effect(() => {
      const tickets = this.tickets();
      if (this.chartInstance && tickets.length >= 0) {
        this.updateChart(tickets);
      }
    });
  }

  ngOnInit() {
    this.loadTickets();
  }

  ngAfterViewInit() {
    this.initChart();
  }

  ngOnDestroy() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }

  loadTickets() {
    this.ticketService.getTickets().subscribe({
      next: (data) => this.tickets.set(data),
      error: (err) => console.error('Failed to load tickets', err)
    });
  }

  getActiveCount() {
    return this.tickets().filter(t => t.status !== 'Done').length;
  }

  initChart() {
    const ctx = this.statusChartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      this.chartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['New', 'Assigned', 'Done', 'Escalate'],
          datasets: [{
            data: [0, 0, 0, 0],
            backgroundColor: [
              'rgba(59, 130, 246, 0.8)',
              'rgba(245, 158, 11, 0.8)',
              'rgba(16, 185, 129, 0.8)',
              'rgba(239, 68, 68, 0.8)'
            ],
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 2,
            hoverOffset: 15
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              titleColor: '#fff',
              bodyColor: '#fff',
              padding: 12,
              cornerRadius: 8,
              displayColors: true
            }
          },
          cutout: '70%'
        }
      });
      this.updateChart(this.tickets());
    }
  }

  updateChart(tickets: Ticket[]) {
    if (!this.chartInstance) return;

    const counts = {
      'New': tickets.filter(t => t.status === 'New').length,
      'Assigned': tickets.filter(t => t.status === 'Assigned').length,
      'Done': tickets.filter(t => t.status === 'Done').length,
      'Escalate': tickets.filter(t => t.status === 'Escalate').length
    };

    this.chartInstance.data.datasets[0].data = [counts['New'], counts['Assigned'], counts['Done'], counts['Escalate']];
    this.chartInstance.update();
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