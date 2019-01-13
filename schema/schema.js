const graphql = require('graphql');
const _ = require('lodash');
const {
    GraphQLSchema,
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLInt,
    GraphQLList
} = graphql;

const {users, companies} = require('../db.json');


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLInt} ,
        firstName: {type: GraphQLString},
        age: {type: GraphQLInt},
        company:{
            type: CompanyType,
            resolve(parentValue, args){
                return _.find(companies, {id: parentValue.companyId});
            }
        }
    })
});

const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({
        id: {type: GraphQLInt},
        name: {type: GraphQLString},
        users: {
            type: new  GraphQLList(UserType),
            resolve(parentValue, args){
                return _.filter(users, {companyId: parentValue.id});
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        user: {
            type: UserType,
            args: {id:{ type: GraphQLInt}},
            resolve(parentValue, args){
                return _.find(users, {id: args.id})
            }
        },
        company: {
            type: CompanyType,
            args: {id: {type: GraphQLInt}},
            resolve(parentValue, args){
                return _.find(companies, {id: args.id})
            }
        }
    }
});

module.exports = new GraphQLSchema ({
    query: RootQuery
});