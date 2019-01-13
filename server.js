const app = require('express')();
const logger = require('morgan')("tiny");
const expressGraphQL = require('express-graphql');

//import database
require('./database');

// Import Schema Graphql
const schema = require('./schema/schema');

// Request Logs
app.use(logger)

// Configure Express GraphQL middleware
app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}))

// Run The Server
app.listen(4000, () => console.log('Listening'))