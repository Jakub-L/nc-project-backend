/* eslint-disable import/newline-after-import */
process.env.NODE_ENV = 'test';

const chai = require('chai');
const { expect } = chai;
const supertest = require('supertest');

chai.use(require('chai-sorted'));
const app = require('../app');
const connection = require('../db/connection');

const request = supertest(app);

describe('/', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe('/api', () => {
    it('GET status:200', () => request
      .get('/api')
      .expect(200)
      .then(({ body }) => {
        expect(body.ok).to.equal(true);
      }));
    describe('/users', () => {
      describe('DEFAULT BEHAVIOUR', () => {
        describe('GET', () => {
          it('produces status: 200', () => request.get('/api/users').expect(200));
          it('returns an object containing an array', () => request.get('/api/users').then(({ body: { users } }) => {
            expect(users).to.be.an('array');
          }));
          it('has an object for each user within the array', () => request.get('/api/users').then(({ body: { users } }) => {
            expect(users).to.have.lengthOf(5);
          }));
          it('provides each user object with associated keys', () => request.get('/api/users').then(({ body: { users } }) => {
            const keysRequired = ['user_id', 'name', 'email', 'user_photo'];
            expect(users.every(user => keysRequired.every(key => user.hasOwnProperty(key)))).to.be
              .true;
          }));
        });
        describe('POST', () => {
          const testUser = {
            password: 'test',
            name: 'Test',
            email: 'test3@email.com',
          };
          it('produces status: 201', () => {
            request
              .post('/api/users')
              .send(testUser)
              .expect(201);
          });
          it('returns posted user containing sent information', () => {
            request
              .post('/api/users')
              .send(testUser)
              .then((res) => {
                const resUser = res.body.user;
                [('name', 'email')].forEach((prop) => {
                  expect(testUser[prop]).to.equal(resUser[prop]);
                });
              });
          });
        });
      });
      describe('PARAMETRIC BEHAVIOUR', () => {
        describe('GET', () => {
          it('produces status: 200', () => request.get('/api/users/1').expect(200));
          it('returns an object containing a user object with the specified user_id', () => request.get('/api/users/1').then(({ body: { user } }) => {
            expect(user.user_id).to.equal(1);
          }));
          it('provides each user object with associated non-sensitive data', () => request.get('/api/users/1').then(({ body: { user } }) => {
            const keysRequired = ['user_id', 'name', 'email', 'user_photo'];
            expect(keysRequired.every(key => user.hasOwnProperty(key))).to.be.true;
          }));
        });
        describe('DELETE', () => {
          it('produces status: 204', () => request.delete('/api/users/1').expect(204));
          it('responds with no content', () => request.delete('/api/users/1').then(({ body }) => {
            expect(body).to.eql({});
          }));
        });
      });
    });
    describe('/sites', () => {
      describe('DEFAULT BEHAVIOUR', () => {
        describe('GET', () => {
          it('produces status: 200', () => request.get('/api/sites').expect(200));
          it('returns an object containing an array', () => request.get('/api/sites').then(({ body: { sites } }) => {
            expect(sites).to.be.an('array');
          }));
          it('has an object for each site within the array', () => request.get('/api/sites').then(({ body: { sites } }) => {
            expect(sites).to.have.lengthOf(1);
          }));
          it('provides each site object with associated keys', () => request.get('/api/sites').then(({ body: { sites } }) => {
            const keysRequired = [
              'site_id',
              'site_name',
              'latitude_min',
              'longitude_min',
              'altitude_min',
              'latitude_max',
              'longitude_max',
              'altitude_max',
              'pin_count',
              'user_count',
            ];
            expect(sites.every(site => keysRequired.every(key => site.hasOwnProperty(key)))).to.be
              .true;
          }));
        });
        describe('POST', () => {
          const testSite = {
            site_name: 'Test Site',
            latitude_min: 0.1234567,
            longitude_min: -8.7654321,
            altitude_min: 10,
            latitude_max: 99.1234567,
            longitude_max: -0.7654321,
            altitude_max: 50,
          };
          it('produces status: 201', () => {
            request
              .post('/api/sites')
              .send(testSite)
              .expect(201);
          });
          it('returns posted site containing sent information', () => {
            request
              .post('/api/sites')
              .send(testSite)
              .then((res) => {
                const resSite = res.body.site;
                Object.keys(testSite).forEach((prop) => {
                  expect(String(testSite[prop])).to.equal(String(resSite[prop]));
                });
              });
          });
        });
      });
      describe('PARAMETRIC BEHAVIOUR', () => {
        describe('GET', () => {
          it('produces status: 200', () => request.get('/api/sites/1').expect(200));
          it('returns an object containing a site object with the specified site_id', () => request.get('/api/sites/1').then(({ body: { site } }) => {
            expect(site.site_id).to.equal(1);
          }));
          it('provides each site object with associated non-sensitive data', () => request.get('/api/sites/1').then(({ body: { site } }) => {
            const keysRequired = [
              'site_id',
              'site_name',
              'latitude_min',
              'longitude_min',
              'altitude_min',
              'latitude_max',
              'longitude_max',
              'altitude_max',
              'pin_count',
              'user_count',
            ];
            expect(keysRequired.every(key => site.hasOwnProperty(key))).to.be.true;
          }));
          describe('DELETE', () => {
            it('produces status: 204', () => request.delete('/api/sites/1').expect(204));
            it('responds with no content', () => request.delete('/api/sites/1').then(({ body }) => {
              expect(body).to.eql({});
            }));
          });
        });
      });
    });
    describe('/pins', () => {
      describe('DEFAULT BEHAVIOUR', () => {
        describe('GET', () => {
          it('produces status: 200', () => request.get('/api/pins').expect(200));
          it('returns an object containing an array', () => request.get('/api/pins').then(({ body: { pins } }) => {
            expect(pins).to.be.an('array');
          }));
          it('has an object for each pin within the array', () => request.get('/api/pins').then(({ body: { pins } }) => {
            expect(pins).to.have.lengthOf(5);
          }));
          it('provides each pin object with associated keys', () => request.get('/api/pins').then(({ body: { pins } }) => {
            const keysRequired = [
              'pin_id',
              'photo_url',
              'note',
              'timestamp',
              'latitude',
              'longitude',
              'altitude',
              'creator',
              'email',
              'user_photo',
              'site_name',
            ];
            expect(pins.every(pin => keysRequired.every(key => pin.hasOwnProperty(key)))).to.be
              .true;
          }));
        });
        describe('POST', () => {
          const testPin = {
            user_id: 1,
            site_id: 1,
            timestamp: '2019-05-10T13:45:08.000Z',
            latitude: 53.123456,
            longitude: -1.654321,
            altitude: 44,
            photo_url: 'https://www.city.ac.uk/__data/assets/image/0006/372714/Post-Bank.jpg',
            note: 'POST test',
          };
          it('produces status: 201', () => {
            request
              .post('/api/pins')
              .send(testPin)
              .expect(201);
          });
          it('returns posted pin containing sent information', () => {
            request
              .post('/api/pins')
              .send(testPin)
              .then((res) => {
                const resPin = res.body.pin;
                ['timestamp', 'latitude', 'longitude', 'altitude', 'photo_url', 'note'].forEach(
                  (prop) => {
                    expect(String(testPin[prop])).to.equal(String(resPin[prop]));
                  },
                );
              });
          });
        });
      });
      describe('PARAMETRIC BEHAVIOUR', () => {
        describe('GET', () => {
          it('produces status: 200', () => request.get('/api/pins/1').expect(200));
          it('returns an object containing a pin object with the specified pin_id', () => request.get('/api/pins/1').then(({ body: { pin } }) => {
            expect(pin.pin_id).to.equal(1);
          }));
          it('provides each pin object with associated non-sensitive data', () => request.get('/api/pins/1').then(({ body: { pin } }) => {
            const keysRequired = [
              'pin_id',
              'photo_url',
              'note',
              'timestamp',
              'latitude',
              'longitude',
              'altitude',
              'creator',
              'email',
              'site_name',
            ];
            expect(keysRequired.every(key => pin.hasOwnProperty(key))).to.be.true;
          }));
        });
        describe('DELETE', () => {
          it('produces status: 204', () => request.delete('/api/pins/1').expect(204));
          it('responds with no content', () => request.delete('/api/pins/1').then(({ body }) => {
            expect(body).to.eql({});
          }));
        });
      });
    });
  });
});
