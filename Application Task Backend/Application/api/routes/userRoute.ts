import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

import AuthService from '../../../src/services/userService';
import { IUserDTO } from '../../../src/dto/IUserDTO';

import attachCurrentUser from '../../../src/api/middlewares/attachCurrentUser';
import isAuth from '../../../src/api/middlewares/isAuth';
import { celebrate, Joi } from 'celebrate';
import winston = require('winston');

var user_controller = require('../../controllers/userController');

const route = Router();

export default (app: Router) => {
  app.use('/auth', route);

  /**
   * @swagger
   * /auth/signup:
   *   post:
   *     summary: Register a new user
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - firstName
   *               - lastName
   *               - email
   *               - password
   *               - role
   *             properties:
   *               firstName:
   *                 type: string
   *                 example: John
   *               lastName:
   *                 type: string
   *                 example: Doe
   *               email:
   *                 type: string
   *                 format: email
   *                 example: john.doe@example.com
   *               password:
   *                 type: string
   *                 format: password
   *                 example: SecurePass123!
   *               role:
   *                 type: string
   *                 example: user
   *     responses:
   *       201:
   *         description: User successfully created
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 userDTO:
   *                   $ref: '#/components/schemas/User'
   *                 token:
   *                   type: string
   *       401:
   *         description: Unauthorized - signup failed
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  route.post(
    '/signup',
    celebrate({
      body: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.string().required()
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body )

      try {
        const authServiceInstance = Container.get(AuthService);
        const userOrError = await authServiceInstance.SignUp(req.body as IUserDTO);

        if (userOrError.isFailure) {
          logger.debug(userOrError.errorValue())
          return res.status(401).send(userOrError.errorValue());
        }
    
        const {userDTO, token} = userOrError.getValue();

        return res.status(201).json({ userDTO, token });
      } catch (e) {
        //logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  /**
   * @swagger
   * /auth/signin:
   *   post:
   *     summary: Sign in to the application
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *                 example: john.doe@example.com
   *               password:
   *                 type: string
   *                 format: password
   *                 example: SecurePass123!
   *     responses:
   *       200:
   *         description: Successfully signed in
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 userDTO:
   *                   $ref: '#/components/schemas/User'
   *                 token:
   *                   type: string
   *                   description: JWT token for authentication
   *       403:
   *         description: Forbidden - invalid credentials
   */
  route.post(
    '/signin',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      logger.debug('Calling Sign-In endpoint with body: %o', req.body)
      try {
        const { email, password } = req.body;
        const authServiceInstance = Container.get(AuthService);
        const result = await authServiceInstance.SignIn(email, password);
        
        if( result.isFailure )
          return res.json().status(403);

        const { userDTO, token } = result.getValue();
        return res.json({ userDTO, token }).status(200);

      } catch (e) {
        logger.error('🔥 error: %o',  e );
        return next(e);
      }
    },
  );

  /**
   * @swagger
   * /auth/logout:
   *   post:
   *     summary: Logout from the application
   *     tags: [Authentication]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Successfully logged out
   *       401:
   *         description: Unauthorized - invalid or missing token
   *
   * @TODO Let's leave this as a place holder for now
   * The reason for a logout route could be deleting a 'push notification token'
   * so the device stops receiving push notifications after logout.
   *
   * Another use case for advance/enterprise apps, you can store a record of the jwt token
   * emitted for the session and add it to a black list.
   * It's really annoying to develop that but if you had to, please use Redis as your data store
   */
  route.post('/logout', isAuth, (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get('logger') as winston.Logger;
    logger.debug('Calling Sign-Out endpoint with body: %o', req.body)
    try {
      //@TODO AuthService.Logout(req.user) do some clever stuff
      return res.status(200).end();
    } catch (e) {
      logger.error('🔥 error %o', e);
      return next(e);
    }
  });

  app.use('/users', route);

  route.get('/me', isAuth, attachCurrentUser, user_controller.getMe);
};
