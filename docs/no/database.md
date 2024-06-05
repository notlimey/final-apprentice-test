# Database Schema

[<- Tilbake](/)
<br />

PostgreSQL

## Restaurants Table (Restauranter)

### Kolonner

-  **id** (PK, GUID)
-  **name**
-  **beskrivelse**
-  **food_type**
-  **address**
-  **state** (selvom oppgaven bare går på innlandet tar jeg med dette sånn at det kan brukes hvis prosjektet blir større)
-  **city**
-  **zip_code**
-  **phone_number**
-  **website**
-  **image_url** - URL til restaurantens bilde
-  **opening_hours** (JSON)
-  **latitude** - Geolokasjon breddegrad
-  **longitude** - Geolokasjon lengdegrad
-  **created_at** (opprettet)
-  **updated_at** (oppdatert)
-  **summary** - AI-generert oppsummering av restauranten (kan være kult å legge til hvis jeg har tid)

## Reviews Table (Anmeldelser)

### Kolonner

-  **id** (PK, UUID)
-  **user_id** (FK til Identity)
-  **restaurant_id** (FK til Restaurants)
-  **review_title**
-  **visit_date** (besøksdato)
-  **food_quality** (matkvalitet) (Integer, rangering fra 1 til 5)
-  **service_quality** (servicekvalitet) (Integer, rangering fra 1 til 5)
-  **ambiance** (stemning) (Integer, rangering fra 1 til 5)
-  **value_for_money** (valuta for pengene) (Integer, rangering fra 1 til 5)
-  **overall_rating** (totalvurdering) (Integer, rangering fra 1 til 5) - Samlet vurdering
-  **comment** - Detaljert anmeldelseskommentar
-  **created_at** (opprettet)
-  **updated_at** (oppdatert)

## Relasjoner

-  **Restaurants til Reviews**: En-til-mange (en restaurant kan ha mange anmeldelser).
