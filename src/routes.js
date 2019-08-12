import { Router } from 'express';
import redis from 'redis';
import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';
import multer from 'multer';
import multerConfig from './config/multer';

import radisConfig from './config/radis';

import UserController from './app/controllers/UserController';
import AccessManagementController from './app/controllers/AccessManagementController';
import AuthenticatorController from './app/controllers/AuthenticatorController';

import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';
import validateAutheticatorStore from './app/validators/AutheticatorStore';
import validateAccessManagementUpdate from './app/validators/AccessManagementUpdate';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

const bruteStore = new BruteRedis({
  client: redis.createClient({
    ...radisConfig,
  }),
});

const bruteForce = new Brute(bruteStore);

routes.post(
  '/auth',
  bruteForce.prevent,
  validateAutheticatorStore,
  AuthenticatorController.store
);
routes.post('/users', validateUserStore, UserController.store);

routes.use(authMiddleware);

routes.put(
  '/access/:userid/management',
  validateAccessManagementUpdate,
  AccessManagementController.update
);

routes.put('/users/', validateUserUpdate, UserController.update);

export default routes;
