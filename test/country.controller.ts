import './../server/common/env';
import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';
let id = null;
describe('Country', () => {
  it('should get all country', () =>
    request(Server)
      .get('/v1/country')
      .set({ token: process.env.UNIT_TESTING_AUTH_TOKEN })
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body).to.be.an('array').of.length.to.not.equal(0);
      }));

  it('should add a new country', () =>
    request(Server)
      .post('/v1/country')
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

  it('should get an country by id', () =>
    request(Server)
      .get(`/v1/country/${id}`)
      .set({ token: process.env.UNIT_TESTING_AUTH_TOKEN })
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('name')
          .equal('test');
      }));

  it('should delete country by id', () =>
    request(Server)
      .delete(`/v1/country/${id}`)
      .set({ token: process.env.UNIT_TESTING_AUTH_TOKEN })
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('name')
          .equal('test');
      }));

  it('should not get an country when id is null', () =>
    request(Server)
      .get(`/v1/country/null`)
      .set({ token: process.env.UNIT_TESTING_AUTH_TOKEN })
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body).equal(
          'Cast to ObjectId failed for value "null" at path "_id" for model "Profiletype"'
        );
      }));

  it('should not get an country when url not found', () =>
    request(Server)
      .get(`/v1/countrys/`)
      .set({ token: process.env.UNIT_TESTING_AUTH_TOKEN })
      .expect('Content-Type', /text/)
      .then((r) => {
        expect(r.status).equal(404);
      }));

  it('should not delete country when id is null', () =>
    request(Server)
      .delete(`/v1/country/null`)
      .set({ token: process.env.UNIT_TESTING_AUTH_TOKEN })
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body).equal(
          'Cast to ObjectId failed for value "null" at path "_id" for model "Profiletype"'
        );
      }));
});
