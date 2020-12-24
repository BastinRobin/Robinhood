import express from 'express';
import controller from './controller';
import tokenVerify from './../../middlewares/token.verify';
export default express
  .Router()
  .get('/', tokenVerify, controller.index)
  .get('/:id', tokenVerify, controller.show)
  .post('/', tokenVerify, controller.store)
  .post('/resident', tokenVerify, controller.createResident)
  .post('/carer', tokenVerify, controller.createCarer)
  .put('/:id', tokenVerify, controller.update)
  .delete('/:id', tokenVerify, controller.delete);
