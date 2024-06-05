# Database Schema

[<- Back](/)
<br />

PostgreSQL

## Restaurants Table

### Columns

-   **id** (PK, GUID)
-   **name**
-   **description**
-   **food_type**
-   **address**
-   **state** (although the task only covers Innlandet, I include this so it can be used if the project expands)
-   **city**
-   **zip_code**
-   **phone_number**
-   **website**
-   **image_url** - URL to the restaurant's image
-   **opening_hours** (JSON)
-   **latitude** - Geolocation latitude
-   **longitude** - Geolocation longitude
-   **created_at** (created)
-   **updated_at** (updated)
-   **summary** - AI-generated summary of the restaurant (could be cool to add if I have time)

## Reviews Table

### Columns

-   **id** (PK, UUID)
-   **user_id** (FK to Identity)
-   **restaurant_id** (FK to Restaurants)
-   **review_title**
-   **visit_date** (visit date)
-   **food_quality** (Integer, rating from 1 to 5)
-   **service_quality** (Integer, rating from 1 to 5)
-   **ambiance** (Integer, rating from 1 to 5)
-   **value_for_money** (Integer, rating from 1 to 5)
-   **overall_rating** (Integer, rating from 1 to 5) - Overall rating
-   **comment** - Detailed review comment
-   **created_at** (created)
-   **updated_at** (updated)

## Relationships

-   **Restaurants to Reviews**: One-to-many (a restaurant can have many reviews).
