import express from 'express';
import controller from './controller';
export default express
  .Router()
  .get('/', controller.listAllTenants)
  .post('/create', controller.createTenants)
  .get('/:id', controller.getItem);
