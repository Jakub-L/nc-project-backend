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
            expect(users).to.have.lengthOf(4);
          }));
          it('provides each user object with associated keys', () => request.get('/api/users').then(({ body: { users } }) => {
            const keysRequired = ['user_id', 'username', 'name', 'email', 'user_photo'];
            expect(users.every(user => keysRequired.every(key => user.hasOwnProperty(key)))).to.be
              .true;
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
            expect(sites).to.have.lengthOf(4);
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
            ];
            expect(sites.every(site => keysRequired.every(key => site.hasOwnProperty(key)))).to.be
              .true;
          }));
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
            expect(pins).to.have.lengthOf(4);
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
      });
    });
  });
});
