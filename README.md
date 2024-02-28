# Games Catalogue Backend

## Overview

The Games Catalogue Backend is a Node.js application built with Express.js and MongoDB. It provides functionalities for handling authorization, storing user data, news, and top games for the Games Catalogue application.

## Application
The backend server is used by the Games Catalogue application, which can be accessed [here](https://amashutikov.github.io/games_test_client/#/).

## Installation

To install and run the backend application locally, follow these steps:

1. Clone the repository:
   git clone <repository_url>
   cd games-catalogue-backend

2. Install dependencies:
   npm install

3. Create a `.env` file in the root directory of the project with the following environment variables:
   PORT=<port_number>
   DATABASE_URL=<mongodb_database_url>
   CLIENT_HOST=<client_host>
   CLIENT_URLS=<client_urls>
   SMTP_HOST=<smtp_host>
   SMTP_PORT=<smtp_port>
   SMTP_USER=<smtp_user>
   SMTP_PASSWORD=<smtp_password>
   JWT_KEY=<jwt_secret_key>
   JWT_REFRESH_KEY=<jwt_refresh_secret_key>

4. Start the server:
   npm start

## Usage

The backend application provides the following endpoints:

- `/registration` - Endpoint for user registration.
- `/activation/:activationToken` - Endpoint for activating user account.
- `/login` - Endpoint for user login.
- `/refresh` - Endpoint for refreshing access token.
- `/verify` - Endpoint for verifying user authentication.
- `/logout` - Endpoint for user logout.
- `/games/top` - Endpoint for retrieving list of top games.
- `/games/byGenre` - Endpoint for retrieving games by genre.
- `/news` - Endpoint for retrieving news.
- `/news/:id` - Endpoint for retrieving a specific news article by ID.
- `/user` - Endpoint for updating user profile information.
- `/user/like` - Endpoint for user to like a game.
- `/user/dislike` - Endpoint for user to dislike a game.
- `/user/:id` - Endpoint for retrieving a specific user's profile by ID.

## Configuration

Ensure that you have set up the required environment variables in the `.env` file before running the application.

## Testing

You can test the functionality of the backend application using Postman. The deployed server is available at: [Games Catalogue Backend](https://games-server-1qpi.onrender.com/) (Note: The server may be asleep occasionally due to being hosted on a free platform).

## Technologies Used

- Node.js
- Express.js
- MongoDB with mongoose
- JWT for authentication
- bcrypt for password hashing
- nodemailer for sending emails
- uuid for generating unique identifiers

## License

This project is distributed under a free license for personal use.
