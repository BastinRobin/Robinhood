import express from 'express';
import controller from './controller';
import tokenVerify from './../../middlewares/token.verify';
export default express.Router().post('/', tokenVerify, controller.upload);
