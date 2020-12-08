import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';

describe('Profile', () => {
  it('should get all examples', () =>
    request(Server)
      .get('/v1/profile')
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body).to.be.an('array').of.length(2);
      }));

  it('should add a new example', () =>
    request(Server)
      .post('/v1/profile')
      .send({ name: 'test' })
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('name')
          .equal('test');
      }));

  it('should get an example by id', () =>
    request(Server)
      .get('/v1/profile/2')
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('name')
          .equal('test');
      }));
});