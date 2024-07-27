# watchNRate

**watchNRate** is a social platform where users can follow others, review movies and TV shows, like and comment on reviews, search for movies, and save them for later or as favorites. It's similar to Instagram but focused on movie and TV show reviews.

## Table of Contents
- [Project Overview](#project-overview)
- [Installation and Setup](#installation-and-setup)
- [Running the Application](#running-the-application)
- [Features](#features)
- [API Documentation](#api-documentation)
- [Future Plans](#future-plans)
- [Contribution Guidelines](#contribution-guidelines)
- [Additional Information](#additional-information)

## Project Overview
**watchNRate** allows users to:
- Follow other users and be followed.
- Review movies and TV shows.
- Like and comment on friends' reviews.
- Search for movies to watch and save them for later.
- Save favorite movies and TV shows.

## Installation and Setup
### Requirements
- Node.js
- MongoDB
- TMDB API key
- Cloudinary account

### Installation Steps
1. Clone the repository:
   git clone https://github.com/yourusername/watchNRate.git
   cd watchNRate
2. Install server dependencies:
   cd server
   npm install
3. Install client dependencies:
   in a new terminal - 
   cd client
   npm install
4. Set up environment vaiables:
   Create a .env file in the server folder and add your MongoDB URI, TMDB API key, and Cloudinary credentials.

### Running the Application
### Development Server
1. Start the server:
   cd server
   npm run server
2. Start the client:
   cd client
   npm run dev
   the development server should be running on localhost:3000, client on localhost: 5173;

## Features
- **User Authentication:** Sign up and log in.
- **User Profiles:** Follow other users, update profile pictures.
- **Movie Reviews:** Post, like, and comment on movie and TV show reviews.
- **Movie Search:** Search for movies and TV shows, save them for later or mark as favorites.

## API Documentation
## Endpoints
### - User Routes
- `GET /authuser` - Authenticate user
- `GET /checkusers/:username` - Check users by username
- `GET /searchthruusers/:user` - Search through users
- `GET /getcurrentuserinfo` - Get current user information
- `GET /getUserProfile/:username` - Get user profile by username

- `POST /sign-up` - Sign up a new user
- `POST /add-fav` - Add to user's favorites
- `POST /login` - Log in a user
- `POST /saveProfileImg` - Save profile image
- `PATCH /followList` - Follow or unfollow a user
- `PATCH /addtowatchList` - Add to user's watch list

### Feature Routes
- `GET /featureinfo` - Get feature information
- `GET /getfeaturereviews` - Get feature reviews

- `POST /addtouserliked` - Add to user's liked features
- `POST /addreview` - Add a review for a feature

- `PATCH /addtowatchlist` - Add feature to watch list

### Review Routes
- `PATCH /reviewlike` - Like a review

- `GET /getuserreviews` - Get user reviews
- `GET /review/:mongoId` - Get a specific user review
- `GET /getrecentreviews` - Get recent reviews

- `PUT /changereview/:reviewId` - Edit a review

- `DELETE /deletereview/:reviewId` - Delete a review

### Comment Routes
- `POST /addcomment` - Add a comment

- `PATCH /commentlike` - Like a comment

- `GET /getcomments/:review` - Get comments for a review

- `PUT /editcomment/:commentId` - Edit a comment

- `DELETE /deletecomment/:commentId` - Delete a comment

## Future Plans
- Add private feature notes for user.
- Separate TV shows by season for reviews and ratings

## License
This project is licensed under the MIT License.