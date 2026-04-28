# siddhu-gstack
This repo shows the use of https://github.com/garrytan/gstack AI frame work for the aspect  New Feature Development,Change Request (CR),Bugs &amp; Defects,Security Enhancement,Security Issues (Hotfixes),Performance Enhancement,Performance Issues,UI/UX,Refactoring,Middleware/API Updates,Technical Debt/Refactoring AND DevOps &amp; Infrastructure.

# Ticket Management System (GSTACK)

[cite_start]This repository demonstrates a full-stack Ticket Management System built using the [gstack AI framework](https://github.com/garrytan/gstack)[cite: 507]. [cite_start]It covers various development aspects, including new feature development, security enhancements (JWT), and DevOps infrastructure[cite: 507, 508].

## 🚀 Overview
[cite_start]The project is a browser-based tool designed for small teams to manage internal tickets through a clean, minimalist interface[cite: 739, 741]. [cite_start]It provides full CRUD (Create, Read, Update, Delete) functionality with a secure, stateless authentication layer.

## 🛠 Tech Stack
* [cite_start]**Frontend:** Angular 17+ with Tailwind CSS for styling[cite: 781, 803].
* [cite_start]**Middleware:** Spring Boot (Java 21+) REST API[cite: 782].
* [cite_start]**Backend:** MySQL 8.0 Database[cite: 710, 782].
* [cite_start]**Security:** JWT-based stateless authentication.
* [cite_start]**DevOps:** Docker & Docker Compose for unified deployment[cite: 710, 799].

## 📂 Project Structure
```text
shdhumale-siddhu-gstack/
├── frontend/           # Angular Single Page Application [cite: 505]
├── ticketserver/       # Spring Boot Backend API [cite: 507]
├── dbschema.sql        # Database initialization script [cite: 505, 708]
├── docker-compose.yml  # Docker orchestration file [cite: 505, 710]
├── document/           # PRD, Technical Specs, and Design Docs [cite: 505]
└── postman_collection.json # API testing collection [cite: 505, 734]
```
📋 Features

Secure Authentication: User registration and login using JWT Bearer tokens.


Ticket Dashboard: Overview of all active tickets with inline actions for editing and deleting.


CRUD Operations: Secure endpoints to create, view, update, and remove tickets.


Client-side Search: Real-time filtering of tickets by name or description.


Optimistic Locking: Version-based collision protection to prevent data overwrites during concurrent edits.

🚦 Getting Started
Prerequisites
Docker and Docker Compose.

Java 21 (for local backend development).

Node.js (for local frontend development).

Quick Start with Docker
Navigate to the project root.

Spin up the infrastructure:

docker-compose up -d

This will initialize the MySQL database and seed it with the required schema.

🧪 API Testing
A Postman collection is provided in the root directory. It includes pre-configured requests for:


POST /auth/register & POST /auth/login.


GET /tickets, POST /tickets, PUT /tickets/{id}, and DELETE /tickets/{id}.

The collection uses environment variables to automatically pass the JWT token from the login response to subsequent ticket requests.
