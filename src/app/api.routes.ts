import express from 'express';
import { responseDecorator } from '../utils/responseDecorator';
import controller from './controller/test.controller';

class Router {
  constructor(server: express.Express) {
    const router = express.Router();
    router.get('/test', (req, res, next) => {
      responseDecorator(controller.test.bind(controller))(req, res, next);
    });
    server.use('/api', router);
  }
}

export default Router;
