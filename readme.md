# GraphQL/Express API example

## Instalation
>1. Download or Git Clone the Repository.
>2. Install Dependencies with `npm install`.
>3. Generate Fake Database for Json Server `npm run seed`.
>4. Start json-server to simule external API `npm run server`.
>5. Start GraphQL API `npm run start`.
>6. Access the Query Tool in path `/graphql`.
>7. Have FUN **:)**

### **Note:** You can reset the database, just delete db.json and run `npm run seed`.

# Examples
## Queries
### Query a Single User by id and Return ***id, firstName, age, CompanyName.***
```js
{
    user(id: 1){
        id
        firstName
        age
        company{
            name
        }
    }
}
```

#### Result

```json
{
    "data":{
        "user":{
            "id": 1,
            "firstName": "John",
            "age": 23,
            "company":{
                "name": "SPC"
            }
        }
    }
}
```

### Query a Single Company.
```js
{
    company(id: 1){
        name
    }
}
```

#### Result

```json
{
    "data":{
        "company":{
            "name": "SPC"
        }
    }
}
```

### Query a Company With List of Users.
```js
{
    company(id: 1){
        name,
        users{
            firstName
            age
        }
    }
}
```
#### Result

```json
    {
        "data":{
            "company":{
                "name":"SPC",
                "users":[{
                    "name": "John",
                    "age": 23
                },{
                    "name": "Matt",
                    "age": 23
                }]
            }
        }
    }
```


### Use ragment.

```js
{
    user(id: 1){
        firstName
        ...jobFriends
    }
}
fragment jobFriends on User{
    work: company{
        name,
        friends: users{
            firstName,
            age
        }
    }
}
```
#### Results
```json
{
    "data":{
        "user":{
            "firstName": "John",
            "work":{
               "name": "SPC",
               "friends": [{
                   "firstName": "Mary",
                   "age": 21
               },{
                   "firstName": "Matt",
                   "age": 23
               },{
                   "firstName": "Joe",
                   "age": 35
               }]
           }
        }
    }
}
```

### Multiple Queries

```js
{
    first: user(id: 1){
        firstName
        age
    }
    last: user(id: 50){
        firstName
        age
    }
}
```
#### Results
```json
{
    "data":{
        "first":{
            "firstName": "John",
            "age": 21
        },
         "last":{
            "firstName": "Matt",
            "age": 23
        }
    }
}
```

### Add a new user and return data

```js 
addUser(firstName: "John", age: 23){
    id
    firstName
    age
}
```

#### Results
````json
{
    "data":{
        "addUser":{
            "id": 51,
            "name": "John Doe",
            "age": 23
        }
    }
}
````

### Add a new company
```js
 addCompany(name: "SPC"){
     id
     name
 }
```
#### Results
````json
{
    "data":{
        "addCompany":{
            "id": 11,
            "name": "SPC"
        }
    }
}
````

----------

## Mutations
### Add User.
```js
mutation{
    addUser(firstName: "John" age: 18){
        id
        firstName
        age
    }
}
```
#### Result
```json
{
    "data":{
        "addUser":{
            "id": 51,
            "firstName": "John",
            "age": 18
        }
    }
}
```
### Edit User.
```js
mutation{
    editUser(firstName: "Matt" age: 21 comapnyId: 11){
        firstName
        age
        company{
            name
        }
    }
}
```
#### Result
```json
{
    "data":{
        "editUser":{
            "firstName": "Matt",
            "age": 21,
            "company": {
                "name": "SPC"
            }
        }
    }
}
```
### Remove User.
```js
mutation{
    deleteUser(id: 51){
        id
        firstName
        age
    }
}
```
#### Result
```json
{
    "data":{
        "addUser":{
            "id": null,
            "firstName": null,
            "age": null
        }
    }
}
```
> **Note:** Because of Json-Server not return nothing on delete the values will return null.
### Add Company.
```js
mutation{
    addCompany(name: "SPC"){
        id
        name
    }
}
```
### Result
```json
{
    "data":{
        "addCompany":{
            "id": 11,
            "name": "SPC"
        }
    }
}
```
### Edit Company.
```js
mutation{
    editCompany(id: 11 name:"Nasa"){
        name
    }
}
```
### Result
```json
{
    "data":{
        "editCompany":{
            "name": "Nasa"
        }
    }
}
```
### Remove Company.
```js
mutation{
    deleteCompany(id: 11){
        name
    }
}
```
### Result
```json
{
    "data":{
        "deleteCompany":{
            "name": null
        }
    }
}
```
> **Note:** Because of Json-Server not return nothing on delete the values will return null.
----------


## Author
### **Name**: Wendreo Matheus
### **Email**: <wendreo.pvh@gmail.com>