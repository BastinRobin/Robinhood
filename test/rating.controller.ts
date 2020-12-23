import './../server/common/env';
import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';
let id = null;
describe('Rating', () => {
  it('should get all rating', () =>
    request(Server)
      .get('/v1/rating')
      .set({ token: process.env.UNIT_TESTING_AUTH_TOKEN })
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body).to.be.an('array').of.length.to.not.equal(0);
      }));

  it('should add a new rating', () =>
    request(Server)
      .post('/v1/rating')
      .set({ token: process.env.UNIT_TESTING_AUTH_TOKEN })
      .send({ name: 'test' })
      .expect('Content-Type', /json/)
      .then((r) => {
        id = r.body._id;
        expect(r.body)
          .to.be.an('object')
          .that.has.property('name')
          .equal('test');
      }));

  it('should get an rating by id', () =>
    request(Server)
      .get(`/v1/rating/${id}`)
      .set({ token: process.env.UNIT_TESTING_AUTH_TOKEN })
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('name')
          .equal('test');
      }));

  it('should delete rating by id', () =>
    request(Server)
      .delete(`/v1/rating/${id}`)
      .set({ token: process.env.UNIT_TESTING_AUTH_TOKEN })
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('name')
          .equal('test');
      }));

  it('should not get an rating when id is null', () =>
    request(Server)
      .get(`/v1/rating/null`)
      .set({ token: process.env.UNIT_TESTING_AUTH_TOKEN })
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body).equal(
          'Cast to ObjectId failed for value "null" at path "_id" for model "Profiletype"'
        );
      }));

  it('should not get an rating when url not found', () =>
    request(Server)
      .get(`/v1/ratings/`)
      .set({ token: process.env.UNIT_TESTING_AUTH_TOKEN })
      .expect('Content-Type', /text/)
      .then((r) => {
        expect(r.status).equal(404);
      }));

  it('should not delete rating when id is null', () =>
    request(Server)
      .delete(`/v1/rating/null`)
      .set({ token: process.env.UNIT_TESTING_AUTH_TOKEN })
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body).equal(
          'Cast to ObjectId failed for value "null" at path "_id" for model "Profiletype"'
        );
      }));
});
