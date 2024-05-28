# Techstack

[<- Tilbake](/)

## Front-end

I frontend skal jeg bruke Next.js med TypeScript. Dette er det jeg har mest erfaring med og det jeg kan best. Next.js er et kjent og velbrukt rammeverk som brukes i mange store prosjekter, så dokumentasjonen og eksemplene tilgjengelig er mange. TypeScript er veldig fint for å ha struktur og forutsigbarhet i prosjektet. Da vet du hva slags objekter du jobber med og hva du kan forvente av data. Samt at den sier fra hvis noe ikke matcher det du forventer.

Sammen med dette skal jeg bruke en rekke pakker som jeg er veldig kjent med og har god erfaring med å bruke:

-  **Tailwind CSS** som er et class/CSS-bibliotek. Jeg bruker også SASS i stedet for CSS fordi den ekstra funksjonaliteten er veldig fin å ha.
-  **React Hook Form** og **Zod** for skjemahåndtering og validering.
-  **Lucide React** for ikoner.
-  **Axios** for datahenting.
-  **@tanstack/react-query** hvis det er behov for klientbasert datahenting.
-  **BiomeJS** for linting og formatering.

### Fordelaktige komponenter

-  Diverse inputkomponenter (der det trengs, for eksempel å legge inn anmeldelse). Dette sparer tid på skjemakomponenter som ofte tar veldig mye unødvendig tid.

## Back-end

I backend har jeg valgt å gå for en API-løsning i .NET. Jeg tenker at jeg skal bruke et controller-basert oppsett. Jeg velger dette fremfor .NET sin nye minimal API fordi det er et mer dokumentert mønster. Har mye erfaring med begge, men mest med controller-basert. Spesielt når det gjelder autentisering, er jeg mye sterkere på det.

Jeg bruker ikke noe særlig med eksterne pakker i dette prosjektet. Eventuelt kan det være Identity, men dette er hvis jeg velger det som autentiseringsleverandør.

-  **EF Core** for ORM.

Hvis jeg hadde hatt bedre tid, kunne jeg lagt til Fluent.SMTP for å sende ut e-poster til brukere, men så at pakken ikke vedlikeholdes lenger, så jeg ville ha lett etter en annen pakke.

Autentisering kan du finne her: [KAN-10](https://notlimey.atlassian.net/browse/KAN-10)

## Database

Til databasen kommer jeg til å bruke PostgreSQL. Hvis jeg velger å laste opp prosjektet offentlig, så kommer jeg til å bruke en gratis PgSQL-instans fra Vercel, ellers hoster jeg bare lokalt.

## Devops og verktøy/applikasjoner

Devops avhenger veldig av tiden. Planen min er å ha hovedfokus på prosjektet, så vil alt ekstra være hvis jeg har tid. Men noen ting jeg skal bruke uavhengig er:

-  Git og GitHub
-  Warp - For terminal på Mac
-  VSCode
-  Slack, Discord og Teams for kommunikasjon
-  Raycast for ulike LLM og LAM verktøy som chat og rettskrivning

Hvis jeg har tid, skal jeg legge ut prosjektet, og da kommer jeg til å bruke plattformen [Vercel](https://vercel.com). Jeg velger denne fordi den er best egnet for Next.js, og jeg har mye erfaring med Vercel. Jeg kommer også til å bruke PostgreSQL fra Vercel, noe jeg ikke har brukt før, men det kan være spennende å prøve. Jeg har ikke hostet en database gratis før, så jeg tenkte det kunne være kult å prøve det ut. Om jeg har tid eller ikke, er et annet spørsmål. Uansett om det blir en del av oppgaven eller ikke, vil jeg legge den ut etter oppgaven for ekstra læring. Da kan jeg også vise frem oppgaven til andre på GitHub.

Docker kan også være et verktøy jeg velger å benytte for at oppsettet av prosjektet skal være enklest mulig for de som vil sette det opp.

Figma benytter jeg kanskje hvis jeg velger å gå for et designsystem og ikke ferdige maler. Da er det fint for å sette opp komponenter der.
