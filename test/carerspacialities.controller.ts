import './../server/common/env';
import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';
let id = null;
describe('carerspacialities', () => {
  it('should get all carerspacialities', () =>
    request(Server)
      .get('/v1/carerspacialities')
      .set({ token: process.env.UNIT_TESTING_AUTH_TOKEN })
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body).to.be.an('array').of.length.to.not.equal(0);
      }));

  it('should add a new carerspacialities', () =>
    request(Server)
      .post('/v1/carerspacialities')
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

  it('should get an carerspacialities by id', () =>
    request(Server)
      .get(`/v1/carerspacialities/${id}`)
      .set({ token: process.env.UNIT_TESTING_AUTH_TOKEN })
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('name')
          .equal('test');
      }));

  it('should delete carerspacialities by id', () =>
    request(Server)
      .delete(`/v1/carerspacialities/${id}`)
      .set({ token: process.env.UNIT_TESTING_AUTH_TOKEN })
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('name')
          .equal('test');
      }));

  it('should not get an carerspacialities when id is null', () =>
    request(Server)
      .get(`/v1/carerspacialities/null`)
      .set({ token: process.env.UNIT_TESTING_AUTH_TOKEN })
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body).equal(
          'Cast to ObjectId failed for value "null" at path "_id" for model "Profiletype"'
        );
      }));

  it('should not get an carerspacialities when url not found', () =>
    request(Server)
      .get(`/v1/carerspacialitiess/`)
      .set({ token: process.env.UNIT_TESTING_AUTH_TOKEN })
      .expect('Content-Type', /text/)
      .then((r) => {
        expect(r.status).equal(404);
      }));

  it('should not delete carerspacialities when id is null', () =>
    request(Server)
      .delete(`/v1/carerspacialities/null`)
      .set({ token: process.env.UNIT_TESTING_AUTH_TOKEN })
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body).equal(
          'Cast to ObjectId failed for value "null" at path "_id" for model "Profiletype"'
        );
      }));
});
