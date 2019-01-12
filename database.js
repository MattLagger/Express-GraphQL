var fs = require('fs');
var faker = require('faker');

function generateAge() {
    return Math.round(Math.random() * 42) + 18
}

function generateUser(id) {
    return {
        id,
        firstName: faker.name.firstName(),
        age: generateAge()
    };
}

function createDatabase() {
    var data = {};
    data.users = [];

    for (let i = 1; i <= 50; i++) {
        data.users.push(generateUser(i))
    }

    return JSON.stringify(data);
}

if(!fs.existsSync('./db.json')) fs.writeFileSync('./db.json', createDatabase());