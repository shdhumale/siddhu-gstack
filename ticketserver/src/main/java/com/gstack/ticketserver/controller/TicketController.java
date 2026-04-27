package com.gstack.ticketserver.controller;

import com.gstack.ticketserver.model.Ticket;
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
    private com.gstack.ticketserver.repository.TicketRepository ticketRepository;

    @Autowired
    private com.gstack.ticketserver.security.JwtUtils jwtUtils;

    @GetMapping
    public ResponseEntity<List<Ticket>> getAllTickets() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null
                && authentication.getPrincipal() instanceof com.gstack.ticketserver.security.UserDetailsImpl) {
            Long userId = ((com.gstack.ticketserver.security.UserDetailsImpl) authentication.getPrincipal()).getId();
            return ResponseEntity.ok(ticketRepository.findByUserId(userId));
        }
        return ResponseEntity.ok(ticketRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Ticket> createTicket(@RequestBody Ticket ticketRequest) {
        Ticket t = new Ticket();
        t.setName(ticketRequest.getName());
        t.setDescription(ticketRequest.getDescription());
        t.setStatus(ticketRequest.getStatus() != null ? ticketRequest.getStatus() : Ticket.Status.New);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null
                && authentication.getPrincipal() instanceof com.gstack.ticketserver.security.UserDetailsImpl) {
            Long userId = ((com.gstack.ticketserver.security.UserDetailsImpl) authentication.getPrincipal()).getId();
            t.setUserId(userId);
        } else {
            return ResponseEntity.status(401).build();
        }

        return ResponseEntity.ok(ticketRepository.save(t));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ticket> updateTicket(@PathVariable Long id, @RequestBody Ticket ticketDetails) {
        return ticketRepository.findById(id)
                .map(ticket -> {
                    ticket.setName(ticketDetails.getName());
                    ticket.setDescription(ticketDetails.getDescription());
                    ticket.setStatus(ticketDetails.getStatus());
                    return ResponseEntity.ok(ticketRepository.save(ticket));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTicket(@PathVariable Long id) {
        return ticketRepository.findById(id)
                .map(ticket -> {
                    ticketRepository.delete(ticket);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}