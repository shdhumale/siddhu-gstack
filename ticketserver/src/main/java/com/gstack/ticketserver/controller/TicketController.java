package com.gstack.ticketserver.controller;

import com.gstack.ticketserver.model.Ticket;
import com.gstack.ticketserver.model.User;
import com.gstack.ticketserver.repository.TicketRepository;
import com.gstack.ticketserver.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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

    @GetMapping
    public ResponseEntity<List<Ticket>> getAllTickets() {
        return ResponseEntity.ok(ticketRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Ticket> createTicket(@RequestBody Ticket ticketRequest) {
        Ticket t = new Ticket();
        t.setName(ticketRequest.getName());
        t.setDescription(ticketRequest.getDescription());
        t.setStatus(ticketRequest.getStatus() != null ? ticketRequest.getStatus() : Ticket.Status.New);
        // how to get userid in this method
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        t.setUserId(user.getId());
        return ResponseEntity.ok(ticketRepository.save(t));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ticket> updateTicket(@PathVariable Long id, @RequestBody Ticket ticketDetails) {
        return ticketRepository.findById(id)
                .map(ticket -> {
                    ticket.setName(ticketDetails.getName());
                    ticket.setDescription(ticketDetails.getDescription());
                    ticket.setStatus(ticketDetails.getStatus());
                    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
                    String email = authentication.getName();
                    User user = userRepository.findByEmail(email)
                            .orElseThrow(() -> new RuntimeException("User not found"));
                    ticket.setUserId(user.getId());
                    return ResponseEntity.ok(ticketRepository.save(ticket));
                })
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTicket(@PathVariable Long id) {
        return ticketRepository.findById(id)
                .map(ticket -> {
                    ticketRepository.delete(ticket);
                    return ResponseEntity.ok().build();
                })
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
    }
}