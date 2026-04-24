# Execution Plan: Ticket Management System

This plan incorporates all decisions from the CEO, Design, and Engineering reviews. Execute tasks sequentially.

## 1. Database & Schema Initialization
- [x] Create `dbschema.sql` capturing the new data models:
  - `users` table: `id` (PK, auto-increment), `email` (unique), `password_hash`, `created_at`, `updated_at`.
  - `tickets` table: `id` (PK), `user_id` (FK to users), `name`, `description`, `status` (ENUM), `version` (for optimistic locking), `created_at`, `updated_at`.
- [x] Build `docker-compose.yml` to spin up MySQL 8.x locally and seed the database using `dbschema.sql`.

## 2. Spring Boot Backend API (Java 21+)
- [x] Scaffold Spring Boot application with Web, JPA, Security, and MySQL Driver dependencies.
- [x] **Entity Models:**
  - Create `User` entity linked to the `users` table.
  - Create `Ticket` entity linked to the `tickets` table. Ensure `@Version` is placed on the version field, and `@CreationTimestamp` / `@UpdateTimestamp` are registered.
- [x] **Data Repositories:** Extend `JpaRepository` for both.
- [x] **Security & Auth:**
  - Configure Spring Security component to be fully stateless.
  - Create `AuthController` (`POST /auth/login`, `POST /auth/register`).
  - Implement JWT parsing filter.
- [x] **Ticket Controllers:**
  - Create standard REST API mappings: `GET /tickets`, `POST /tickets`, `PUT /tickets/{id}`, `DELETE /tickets/{id}`.
  - Secure all endpoints to require an authenticated JWT token.
- [x] **Postman Collection:** Generate `postman_collection.json` containing these requests for manual testing.

## 3. Angular Frontend Application
- [x] **Setup:** Initialize workspace (`ng new frontend --routing --style tailwind`). Configure Tailwind CSS.
- [x] **Auth Layer:**
  - Create Authentication Guard (`AuthGuard`) to protect ticket routes.
  - Create Login UI component.
  - Create Angular `HttpInterceptor` to attach the Bearer token to all outgoing requests.
- [x] **Ticket Views:**
  - **Dashboard:** Implements table layout displaying all active tickets. Include empty state graphics if `[]` is returned. Add inline 'Delete' action to each row. 
  - **Create / Edit Modal:** Slide-out panel or modal for building and updating tickets (respecting the `version` payload for collision protection). The Ticket ID field must be auto-generated and read-only.
  - **Search:** Angular Pipe or computed signal to filter the locally loaded tickets list instantly.
- [x] **API Integration:** Generate Angular `TicketService` and `AuthService` to hook up the frontend with the Spring Boot backend.

## 4. Final Integration & DX
- [ ] Ensure CORS is properly configured in Spring Boot so the Angular dev server (port 4200) can interact with it (port 8080).
- [ ] Add frontend and backend services to the unified `docker-compose.yml` or provide clear README instructions. 

---
**Status:** READY FOR EXECUTION
