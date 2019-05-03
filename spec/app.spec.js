/* eslint-disable import/newline-after-import */
process.env.NODE_ENV = 'test';

const chai = require('chai');
const { expect } = chai;
const supertest = require('supertest');

chai.use(require('chai-sorted'));
const app = require('../app');
