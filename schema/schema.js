const graphql = require('graphql');
const {
    GraphQLSchema,
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;
const axios = require('axios');
const _ = require('lodash');
const {companies, users} = require('../db.json');
const Service = require('../service');


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLInt} ,
        firstName: {type: GraphQLString},
        age: {type: GraphQLInt},
        company:{
            type: CompanyType,
            async resolve(parentValue, args){
                const company = await axios.get(`http://localhost:5000/companies/${parentValue.companyId}`);
                return company.data
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
            async resolve(parentValue, args){
                const users = await axios.get(`http://localhost:5000/companies/${parentValue.id}/users`);
                return users.data;
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
            async resolve(parentValue, args){
                const users = await axios.get(`http://localhost:5000/users/${args.id}`);
                return users.data;
            }
        },
        company: {
            type: CompanyType,
            args: {id: {type: GraphQLInt}},
            async resolve(parentValue, args){
                const companies = await axios.get(`http://localhost:5000/copanies/${args.id}`);
                return companies.data;
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)},
                companyId: {type: GraphQLInt}
            },
            resolve(parentValue, args){

            }
        }
    }
})

module.exports = new GraphQLSchema ({
    query: RootQuery
});