import express from 'express';
import controller from './controller';
export default express
  .Router()
  .post('/login', controller.login)
  .post('/client/signup', controller.clientSignup)
  .post('/carer/signup', controller.carerSignup)
  .get('/logout', controller.login)
  .post('/generate/jwt', controller.generateJWT);
