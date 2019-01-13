var fs = require('fs');
var faker = require('faker');

// Generate Age Between 18 and 60
function generateAge() {
    return Math.round(Math.random() * 42) + 18
}

// Generate new User
function generateUser(id) {
    return {
        id,
        firstName: faker.name.firstName(),
        age: generateAge(),
        companyId: Math.round(Math.random() * 9) + 1
    };
}

// Generate Company
function generateCompany(id) {
    return {
        id,
        name: faker.company.companyName(),
    }
}

// Create Databases
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

// Write Document if file exists
if(!fs.existsSync('./db.json')) fs.writeFileSync('./db.json', createDatabase());