const faker = require('faker');
const bcrypt = require('bcrypt');
const fs = require('fs');

const pinsArray = [];
const usersArray = [];
const sitesArray = [];
const pinsCount = 1000;
const usersCount = 30;
const sitesCount = 10;

for (let i = 1; i <= pinsCount; i += 1) {
  pinsArray.push({
    user_id: faker.random.number({ min: 1, max: usersCount }),
    site_id: faker.random.number({ min: 1, max: sitesCount }),
    timestamp: faker.date.recent().toISOString(),
    latitude: faker.random.number({ min: 53.77, max: 53.81, precision: 0.000001 }),
    longitude: faker.random.number({ min: -1.58, max: -1.51, precision: 0.000001 }),
    altitude: faker.random.number({ min: 5, max: 150 }),
    photo_url: Math.random() > 0.9 ? '' : faker.image.imageUrl(),
    note: Math.random() > 0.9 ? '' : faker.lorem.words(faker.random.number({ min: 10, max: 150 })),
  });
}

for (let i = 1; i <= usersCount; i += 1) {
  usersArray.push({
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    password_hash: bcrypt.hashSync('password', 10),
    email: faker.internet.email(),
    user_photo: faker.internet.avatar(),
  });
}

for (let i = 1; i <= sitesCount; i += 1) {
  sitesArray.push({
    site_name: faker.address.city(),
    latitude_min: faker.random.number({ min: 53.2, max: 53.5, precision: 0.000001 }),
    longitude_min: faker.random.number({ min: -1.7, max: -1.6, precision: 0.000001 }),
    altitude_min: faker.random.number({ min: 0, max: 5 }),
    latitude_max: faker.random.number({ min: 54.5, max: 54.7, precision: 0.000001 }),
    longitude_max: faker.random.number({ min: -1.5, max: -1.4, precision: 0.000001 }),
    altitude_max: faker.random.number({ min: 150, max: 155 }),
  });
}

fs.writeFile(
  './db/data/dev-data/users.json',
  JSON.stringify(usersArray, null, 4),
  'utf8',
  () => {},
);
fs.writeFile('./db/data/dev-data/pins.json', JSON.stringify(pinsArray, null, 4), 'utf8', () => {});
fs.writeFile(
  './db/data/dev-data/sites.json',
  JSON.stringify(sitesArray, null, 4),
  'utf8',
  () => {},
);
