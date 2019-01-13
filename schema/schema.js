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
                const companies = await axios.get(`http://localhost:5000/companies/${args.id}`);
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
            async resolve(parentValue, {firstName, age}){
                const user = await axios.post('http://localhost:5000/users', {firstName, age});
                console.log(user.data);
                return user.data;
            }
        },
        editUser:{
            type: UserType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLInt)},
                firstName: {type: GraphQLString},
                age: {type: GraphQLInt},
                companyId: {type: GraphQLInt}
            },
            async resolve(parentValue, args){
                const user = await axios.patch(`http://localhost:5000/users/${args.id}`, args);
                return user.data;
            }
        },
        deleteUser: {
            type: UserType,
            args:{
                id:{ type: new GraphQLNonNull(GraphQLInt)}
            },
            async resolve(parentValue, {id}){
                const user = await axios.delete(`http://localhost:5000/users/${id}`)
                return user.data;
            }
        },
        addCompany: {
            type: CompanyType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
            },
            async resolve(parentValue, {name}){
                console.log(name)
                const company = await axios.post('http://localhost:5000/companies', {name});
                console.log(company.data);
                return company.data;
            }
        },
        editCompany:{
            type: CompanyType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLInt)},
                name: {type: GraphQLString},
            },
            async resolve(parentValue, args){
                const company = await axios.patch(`http://localhost:5000/companies/${args.id}`, args);
                return company.data;
            }
        },
        deleteCompany: {
            type: CompanyType,
            args:{
                id:{ type: new GraphQLNonNull(GraphQLInt)}
            },
            async resolve(parentValue, {id}){
                const company = await axios.delete(`http://localhost:5000/companies/${id}`)
                return company.data;
            }
        }
    }
})

module.exports = new GraphQLSchema ({
    query: RootQuery,
    mutation: mutation
});