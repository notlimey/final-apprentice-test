# Authentication

[<- Back](/)

**I have thought a lot about authentication, and here are some points I have noted**:

## Authentication

-   Authentication must work seamlessly.

### Admin Roles

-   It must be possible to add roles for admin users.

### OAuth Solution

-   It may be wise to add Google, Facebook, etc. login to make it easier for users to get started.
-   Important to remember token handling, renewal, and proper access control.

### Platform Integration

-   Authentication must work in both Next.js and .NET. Both need to have contexts of authentication.
-   Next.js sessions must authenticate against the API.

### Access Control

-   Limited access if not logged into the API.
-   It may be wise to use the rule that you must be authenticated, otherwise, the request must come from server-side Next.js with an API token to be approved.

## Alternatives Considered

### Clerk

Considered a third-party service called Clerk, but primarily did not choose it due to limited resources on how it integrates with .NET. It's also worth noting that Clerk can get expensive if it's a large project since you pay for the number of active users over 100,000. However, it is a good alternative if I were only building the project in Next.js.

### Firebase

Have used Firebase before and found it tedious/difficult to use in .NET. It's also not easy to integrate roles across services.

## Chosen Solution: Identity in .NET

I choose to go for Identity in .NET, which is built by Microsoft. This is a package that allows me to set up authentication on my own, handles roles very well, and allows OAuth connections with other services.

### Advantages

-   I have good experience working with Identity from before.
-   Works very well with EF Core.
-   Highlights my competence around authentication and setting up advanced structures in auth.
-   Easy to set up role-based access control.
-   Fast development and implementation into the already existing .NET API.

By using Identity in .NET, I ensure that the authentication in the application works seamlessly and securely, while also leveraging my previous experiences and technical knowledge to build a robust solution.
