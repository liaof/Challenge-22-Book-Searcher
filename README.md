# Book Search Engine - Bearch

### [Heroku Link](https://blooming-basin-47169.herokuapp.com/)

## Summary
This week, we had to incorporate GraphQL into an existing, fully functional website. To do this required refactoring the API to use GraphQL serverside; and fixing up the client side to take advantange of the updated server.

The task entailed converting the existing routes, controllers, and models into typeDefs and resolvers on the back-end. This allows us to then execute queries without first importing the query itself from the serverside API.

### Usage
Click on the heroku link above, or clone the repository 'npm i' from the root directory of the project. Then run 'npm run develop' to simultaneously launch the client and the server.

To utlise the GraphQL Playground, change directories to the 'client' folder, then run npm run watch and go to [http://localhost:3001/graphql](http://localhost:3001/graphql).

## Missing Features
Save book, remove book

### Features
1. Conditionally rendered navbar, depending on login status</br>
2. Add books to your reading list if logged in</br>
3. Google Bookstore link, avaliable even if the user is not logged in</br>

### Tech Used
- MongoDB</br>
- Express.js</br>
- React</br>
- Node.js</br>


