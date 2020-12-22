import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';

describe('Auth', () => {
  it('should login user', () =>
    request(Server)
      .post('/v1/auth/login')
      .send({
        email: 'nigesh.w.17@gmail.com',
        password: '000000',
      })
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('token')
          .that.has.property('auth');
      }));
});
