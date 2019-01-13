# GraphQL/Express API example

## Instalation
1. Download or Git Clone Repository.
2. Install Dependencies with `npm install`.
3. Generate Fake Database for Json Server `npm run seed`.
4. Start json-server to simule external API `npm run server`.
5. Start GraphQL API `npm run start`.
6. Access the Query Tool in path `/graphql`.
7. Have FUN **:)**

## Examples
### Query a Single User by id and Return *id,firstName,age,CompanyName.
```js
{
    user(id: 1){
        id,
        firstName,
        age,
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

### Query a Single Company
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

### Query a Company With List of Users
```js
{
    company(id: 1){
        name,
        users{
            firstName,
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


### Use Fragment

```js
{
    user(id: 1){
        firstName,
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
        firstName,
        age
    },
    last: user(id: 50){
        firstName,
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
    id,
    firstName,
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
     id,
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

## Author
### **Name**: Wendreo Matheus
### **Email**: <wendreo.pvh@gmail.com>