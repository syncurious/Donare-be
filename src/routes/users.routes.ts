import { Router } from 'express';
import * as UserController from '../controllers/user.controller.js';
import { validateBody } from '../middlewares/validate.js';
import { validateCreateUser, validateUpdateUser } from '../validators/user.validators.js';
import { validateObjectIdParam } from '../middlewares/objectId.js';

export const router = Router();

router.post('/', validateBody(validateCreateUser), UserController.createUser);
router.get('/', UserController.getUsers);
router.get('/profile/:id', validateObjectIdParam('id'), UserController.getUserProfile);
router.get('/:id', validateObjectIdParam('id'), UserController.getUserById);
router.patch('/:id', validateObjectIdParam('id'), validateBody(validateUpdateUser), UserController.updateUser);
router.patch('/:id/preferences', validateObjectIdParam('id'), UserController.updatePreferences);
router.delete('/:id', validateObjectIdParam('id'), UserController.deleteUser);


