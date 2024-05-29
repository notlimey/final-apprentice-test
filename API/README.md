# API documentation

## AuthController
AuthController Documentation
The AuthController is a controller class in the ASP.NET Core MVC framework. It is responsible for handling authentication-related requests in the application. This includes user registration, login, and managing user information.  

### Endpoints
#### POST /auth/login
This endpoint is used for user login. It accepts a LoginDto object in the request body, which contains the user's email and password. If the login is successful, it returns a LoginResultDto object, which includes the user's information, authentication token, and roles.  
#### POST /auth/register
This endpoint is used for user registration. It accepts a RegisterUserDto object in the request body, which contains the user's username, email, password, and other personal details. If the registration is successful, it returns a UserDto object, which includes the user's information.  
#### GET /auth/externallogin
This endpoint is used to initiate an external login process. It accepts a provider name and an optional return URL. It redirects the user to the external login page.  
#### GET /auth/externallogincallback
This endpoint is used as a callback for the external login process. It handles the external login information and logs the user in if the process is successful.  
#### GET /auth/Personal
This endpoint is used to get the personal information of the currently logged-in user. It returns a PersonalUserResult object, which includes the user's information and roles.  
#### GET /auth/Personal/Extended
This endpoint is used to get the extended personal information of the currently logged-in user. It returns a PersonalUserResultExtended object, which includes the user's information, roles, and login providers.  

### Private Methods
#### GenerateJwtToken
This method is used to generate a JWT token for the user. It accepts an ApplicationUser object and a list of roles. It returns a JWT token as a string.  
#### RandomizeUsernameHash
This method is used to generate a unique username for the user. It accepts an ApplicationUser object and an optional depth parameter. It returns an ApplicationUser object with a unique username.

## RestaurantsController

RestaurantsController Documentation
The RestaurantsController is a controller class in the ASP.NET Core MVC framework. It is responsible for handling restaurant-related requests in the application. This includes retrieving restaurant information, and creating new restaurants.  
### Endpoints
#### GET /restaurants
This endpoint is used to retrieve a list of all restaurants. It does not require any authentication.  
#### GET /restaurants/{slugOrId}
This endpoint is used to retrieve a specific restaurant by its slug or ID. It does not require any authentication.  
#### POST /restaurants
This endpoint is used to create a new restaurant. It accepts a CreateRestaurantDto object in the request body, which contains the restaurant's details. This endpoint requires the user to be authenticated and have the "Admin" role.  
### Private Methods
There are no private methods in this controller.  

### Dependencies
This controller depends on IRestaurantService, which is used to interact with the underlying restaurant data.

## ReviewsController
The ReviewsController is a controller class in the ASP.NET Core MVC framework. It is responsible for handling review-related requests in the application. This includes retrieving reviews by restaurant or user, creating new reviews, and deleting reviews.  

### Endpoints
#### GET /reviews/Restaurant/{id}
This endpoint is used to retrieve a list of all reviews for a specific restaurant by its ID. It requires the user to be authenticated with an API token.  
#### GET /reviews/User/{id}
This endpoint is used to retrieve a list of all reviews made by a specific user by their ID. It requires the user to be authenticated.  
#### GET /reviews/Personal/{restaurantId}
This endpoint is used to retrieve the personal review of the currently authenticated user for a specific restaurant by its ID.  
#### POST /reviews/{restaurantId}
This endpoint is used to create a new review for a specific restaurant by its ID. It accepts a CreateReviewDto object in the request body, which contains the review's details. This endpoint requires the user to be authenticated.  
#### DELETE /reviews/{id}
This endpoint is used to delete a specific review by its ID. It requires the user to be authenticated.  

### Dependencies
This controller depends on IReviewService and IRestaurantService, which are used to interact with the underlying review and restaurant data respectively. It also depends on UserManager<ApplicationUser> for user-related operations and IHttpContextAccessor for accessing the HTTP context.