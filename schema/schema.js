const graphql = require('graphql');
const _ = require('lodash');
const {
    GraphQLSchema,
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLInt,
} = graphql;

const {users} = require('../db.json');


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: {type: GraphQLInt} ,
        firstName: {type: GraphQLString},
        age: {type: GraphQLInt}
    }
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        user: {
            type: UserType,
            args: {id:{ type: GraphQLInt}},
            resolve(parentValue, args){
                return _.find(users, {id: args.id})
            }
        }
    }
});

module.exports = new GraphQLSchema ({
    query: RootQuery
});