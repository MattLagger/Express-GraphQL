const app = require('express')();
const logger = require('morgan')("short");
const expressGraphQL = require('express-graphql');

app.use('/graphql', expressGraphQL({
    graphiql: true
}))

app.use(logger)

app.listen(4000, () => console.log('Listening'))