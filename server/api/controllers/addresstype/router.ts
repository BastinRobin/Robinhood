import express from 'express';
import controller from './controller';
export default express
  .Router()
  .get('/', controller.index)
  .get('/:id', controller.show)
  .post('/', controller.store)
  .put('/:id', controller.update)
  .delete('/:id', controller.delete);
