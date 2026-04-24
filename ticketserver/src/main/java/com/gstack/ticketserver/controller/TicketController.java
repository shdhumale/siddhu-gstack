package com.gstack.ticketserver.controller;

import com.gstack.ticketserver.model.Ticket;
import com.gstack.ticketserver.model.User;
import com.gstack.ticketserver.repository.TicketRepository;
import com.gstack.ticketserver.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/tickets")
public class TicketController {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private UserRepository userRepository;

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @GetMapping
    public ResponseEntity<List<Ticket>> getAllTickets() {
        User user = getCurrentUser();
        List<Ticket> tickets = ticketRepository.findByUserId(user.getId());
        return ResponseEntity.ok(tickets);
    }

    @PostMapping
    public ResponseEntity<Ticket> createTicket(@RequestBody Ticket ticketRequest) {
        User user = getCurrentUser();
        Ticket t = new Ticket();
        t.setUserId(user.getId());
        t.setName(ticketRequest.getName());
        t.setDescription(ticketRequest.getDescription());
        t.setStatus(ticketRequest.getStatus() != null ? ticketRequest.getStatus() : Ticket.Status.New);

        return ResponseEntity.ok(ticketRepository.save(t));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ticket> updateTicket(@PathVariable Long id, @RequestBody Ticket ticketDetails) {
        User user = getCurrentUser();
        Ticket ticket = ticketRepository.findById(id)
                .filter(t -> t.getUserId().equals(user.getId()))
                .orElseThrow(() -> new RuntimeException("Ticket not found or unauthorized"));

        ticket.setName(ticketDetails.getName());
        ticket.setDescription(ticketDetails.getDescription());
        ticket.setStatus(ticketDetails.getStatus());
        // JPA handles @Version optimistic locking validation automatically during save
        return ResponseEntity.ok(ticketRepository.save(ticket));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTicket(@PathVariable Long id) {
        User user = getCurrentUser();
        return ticketRepository.findById(id)
                .filter(t -> t.getUserId().equals(user.getId()))
                .map(t -> {
                    ticketRepository.delete(t);
                    return ResponseEntity.ok().build();
                })
                .orElseThrow(() -> new RuntimeException("Ticket not found or unauthorized"));
    }
}
