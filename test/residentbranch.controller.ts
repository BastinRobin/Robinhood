import './../server/common/env';
import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';
let id = null;
describe('residentbranch', () => {
  it('should get all residentbranch', () =>
    request(Server)
      .get('/v1/residentbranch')
      .set({ token: process.env.UNIT_TESTING_AUTH_TOKEN })
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body).to.be.an('array').of.length.to.not.equal(0);
      }));

  it('should add a new residentbranch', () =>
    request(Server)
      .post('/v1/residentbranch')
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

  it('should get an residentbranch by id', () =>
    request(Server)
      .get(`/v1/residentbranch/${id}`)
      .set({ token: process.env.UNIT_TESTING_AUTH_TOKEN })
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('name')
          .equal('test');
      }));

  it('should delete residentbranch by id', () =>
    request(Server)
      .delete(`/v1/residentbranch/${id}`)
      .set({ token: process.env.UNIT_TESTING_AUTH_TOKEN })
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('name')
          .equal('test');
      }));

  it('should not get an residentbranch when id is null', () =>
    request(Server)
      .get(`/v1/residentbranch/null`)
      .set({ token: process.env.UNIT_TESTING_AUTH_TOKEN })
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body).equal(
          'Cast to ObjectId failed for value "null" at path "_id" for model "Profiletype"'
        );
      }));

  it('should not get an residentbranch when url not found', () =>
    request(Server)
      .get(`/v1/residentbranchs/`)
      .set({ token: process.env.UNIT_TESTING_AUTH_TOKEN })
      .expect('Content-Type', /text/)
      .then((r) => {
        expect(r.status).equal(404);
      }));

  it('should not delete residentbranch when id is null', () =>
    request(Server)
      .delete(`/v1/residentbranch/null`)
      .set({ token: process.env.UNIT_TESTING_AUTH_TOKEN })
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body).equal(
          'Cast to ObjectId failed for value "null" at path "_id" for model "Profiletype"'
        );
      }));
});
