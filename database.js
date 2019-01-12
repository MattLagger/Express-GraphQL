var fs = require('fs');
var faker = require('faker');

function generateAge() {
    return Math.round(Math.random() * 42) + 18
}

function generateUser(id) {
    return {
        id,
        firstName: faker.name.firstName(),
        age: generateAge(),
        companyId: Math.round(Math.random() * 9) + 1
    };
}

function generateCompany(id) {
    return {
        id,
        name: faker.company.companyName(),
    }
}

function createDatabase() {
    var data = {};
    data.users = [];
    data.companies = [];

    // Generate Users
    for (let i = 1; i <= 50; i++) {
        data.users.push(generateUser(i))
    }

    // Generate Companies
    for (let i = 1; i <= 10; i++) {
        data.companies.push(generateCompany(i));
    }

    return JSON.stringify(data);
}

if(!fs.existsSync('./db.json')) fs.writeFileSync('./db.json', createDatabase());