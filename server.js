const app = require('express')();
const logger = require('morgan')("tiny");
const expressGraphQL = require('express-graphql');

//import database
require('./database');

const schema = require('./schema/schema');

app.use(logger)

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}))


app.listen(4000, () => console.log('Listening'))