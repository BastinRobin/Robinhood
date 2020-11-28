import express from 'express';
import controller from './controller';
export default express
  .Router()
  .post('/', controller.create)
  .get('/', controller.findAll)
  .get('/:tenant_name', controller.find)
  .delete('/:tenant_name', controller.delete);
