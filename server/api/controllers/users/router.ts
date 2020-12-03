import express from 'express';
import controller from './controller';
export default express
  .Router()
  .post('/', controller.create)
  .get('/', controller.findAll)
  .get('/:user_name', controller.find)
  .delete('/:user_name', controller.delete);
