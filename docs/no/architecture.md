Legg en plan for både frontend og backend arkitektur. Hvordan skal oppsettet gjøres og hva er viktig for at det skal fungere bra?

Arkitekturen bygger på [Techstack](/docs/no/techstack.md).

## 1. Frontend

### Framework
-  **Next.js** med **TypeScript**

### UI Library
-  **Tailwind CSS** og **React Hook Form**

### Data Fetching
-  **Axios** og **@tanstack/react-query**

### State Management
-  **React Context** eller **Zustand** (hvis nødvendig)

### Ikoner
-  **Lucide React**

### Oppsett

#### App Router
Jeg kommer til å bruke app router til oppsettet av routing. Relativt nytt i Next.js, men ikke for nytt så det er mye bugs. Veldig bra og enkelt å bruke for ISR og SSR av sider.

#### Common Folder
-  Components
-  Hooks
-  Providers
-  ...etc.

## 2. Backend

### Framework
-  **.NET** med et controller-basert oppsett

### Autentisering
-  **Identity** for brukeradministrasjon og autentisering

### Database ORM
-  **EF Core**

### Arkitekturkomponenter

#### Controllers
-  Controllere for CRUD operasjoner på restauranter, anmeldelser og brukere

#### Services
-  For logikk mellom database og controllere

#### Models
-  Alt må ha modeller som representerer data i systemet

#### Authentication
-  Alle services og klasser som håndterer autentisering

Mer informasjon finnes på [Database struktur](/docs/no/database.md).
