# Architecture

[<- Back](/)
<br />

Outline a plan for both frontend and backend architecture. How should the setup be done and what is important for it to function well?

The architecture builds on the [Tech Stack](/docs/en/techstack.md).

## 1. Frontend

### Framework
-   **Next.js** with **TypeScript**

### UI Library
-   **Tailwind CSS** and **React Hook Form**

### Data Fetching
-   **Axios** and **@tanstack/react-query**

### State Management
-   **React Context** or **Zustand** (if necessary)

### Icons
-   **Lucide React**

### Setup

#### App Router
I will use the app router for setting up routing. It is relatively new in Next.js but not too new to have many bugs. It's very good and easy to use for ISR and SSR of pages.

#### Common Folder
-   Components
-   Hooks
-   Providers
-   ...etc.

## 2. Backend

### Framework
-   **.NET** with a controller-based setup

### Authentication
-   **Identity** for user management and authentication

### Database ORM
-   **EF Core**

### Architecture Components

#### Controllers
-   Controllers for CRUD operations on restaurants, reviews, and users

#### Services
-   For logic between the database and controllers

#### Models
-   Everything needs models that represent data in the system

#### Authentication
-   All services and classes handling authentication

More information can be found at [Database Structure](/docs/en/database.md).
