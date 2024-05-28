# Authentication

[<- Tilbake](/)

**Jeg har tenkt mye på autentisering, og det er noen punkter jeg noterer meg**:

## Autentisering

-  Autentisering må fungere sømløst.

### Adminroller

-  Det må være mulig å legge til roller for admin-brukere.

### OAuth-løsning

-  Det kan være lurt å legge til Google, Facebook, etc. login for å gjøre det enklere for brukere å starte opp.
-  Viktig å huske på håndtering av tokens, fornyelse og god tilgangskontroll.

### Plattformintegrasjon

-  Autentisering må fungere både i Next.js og .NET. Begge må ha kontekst av autentisering.
-  Next.js-sesjoner må autentisere seg mot API-et.

### Tilgangskontroll

-  Begrenset tilgang hvis man ikke er logget inn i API-et.
-  Det kan være lurt å benytte regelen om at man må være autentisert, ellers må requesten komme fra server-side Next.js med API-token for å bli godkjent.

## Alternativer vurdert

### Clerk

Vurderte en tredjeparts tjeneste som heter Clerk, men har i hovedsak ikke valgt denne pga lite tilgang på ressurser som sier noe om hvordan det integreres i .NET. Det er også verdt å merke at Clerk kan bli dyrt hvis det er ett stort prosjekt ettersom du betaler for antall aktive brukere over 100000. Men det er ett bra alternativ hvis jeg bare skulle bygd prosjektet i Next.js.

### Firebase

Har brukt Firebase før og synes det var tungvindt/vanskelig å bruke i .NET. Så er det ikke lett å integrere roller i det på tvers av tjenester.

## Valgt løsning: Identity i .NET

Jeg velger å gå for Identity i .NET som er bygd av Microsoft. Dette er en pakke som lar meg sette opp autentisering på egenhånd, håndterer roller veldig bra, og tillater OAuth-kobling med andre tjenester.

### Fordeler

-  Har god erfaring med å jobbe med Identity fra før.
-  Fungerer veldig godt med EF Core.
-  Får frem kompetansen min rundt autentisering og oppsett av avanserte strukturer i auth.
-  Enkelt å sette opp rollebasert tilgangskontroll.
-  Rask utvikling og implementering inn i det allerede eksisterende .NET API-et.

Ved å bruke Identity i .NET, sikrer jeg at autentiseringen i applikasjonen fungerer sømløst og sikkert, samtidig som jeg utnytter mine tidligere erfaringer og tekniske kunnskaper til å bygge en robust løsning.
**