import express from 'express';
import controller from './controller';
export default express
  .Router()
  .get('/', controller.index)
  .get('/:id', controller.show)
  .post('/', controller.store)
  .put('/:id', controller.update)
  .delete('/', controller.deleteAll)
  .delete('/:id', controller.delete)
  .get('/count/all', controller.count);
