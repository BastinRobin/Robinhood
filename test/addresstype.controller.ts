import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';

describe('Addresstype', () => {
  it('should get all examples', () =>
    request(Server)
      .get('/v1/addresstype')
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body).to.be.an('array').of.length(2);
      }));

  it('should add a new example', () =>
    request(Server)
      .post('/v1/addresstype')
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
      .get('/v1/addresstype/2')
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('name')
          .equal('test');
      }));
});
