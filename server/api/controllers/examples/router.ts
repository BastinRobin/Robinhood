import express from 'express';
import controller from './controller';
import connectionResolver from '../../middlewares/connection.resolver';
export default express
  .Router()
  .post('/', controller.create)
  .get('/', connectionResolver, controller.all)
  .get('/:id', controller.byId);
