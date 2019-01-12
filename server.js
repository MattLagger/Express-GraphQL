const app = require('express')();
const logger = require('morgan')("short");
const expressGraphQL = require('express-graphql');

const schema = require('./schema/schema');

//import database
require('./database');

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}))

app.use(logger)

app.listen(4000, () => console.log('Listening'))