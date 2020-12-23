import './../server/common/env';
import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';

describe('Users', () => {
  it('should get all users', () =>
    request(Server)
      .get('/v1/users')
      .set({ token: process.env.UNIT_TESTING_AUTH_TOKEN })
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body).to.be.an('array').of.length.to.not.equal(0);
      }));

  it('should add a new user', () =>
    request(Server)
      .post('/v1/users')
      .set({ token: process.env.UNIT_TESTING_AUTH_TOKEN })
      .send({
        user_name: 'test',
        password: 'test',
        email: 'test@test.com',
        enabled: true,
      })
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('user_name')
          .equal('test');
      }));

  it('should get an user by user_name', () =>
    request(Server)
      .get('/v1/users/admin')
      .set({ token: process.env.UNIT_TESTING_AUTH_TOKEN })
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('user_name')
          .equal('admin');
      }));
});
