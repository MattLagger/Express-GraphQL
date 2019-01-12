const app = require('express')();
const logger = require('morgan')("short");
const expressGraphQL = require('express-graphql');

//import database
require('./database');

const schema = require('./schema/schema');

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}))

app.use(logger)

app.listen(4000, () => console.log('Listening'))