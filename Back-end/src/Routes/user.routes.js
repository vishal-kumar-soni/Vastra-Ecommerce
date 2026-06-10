import { Router } from 'express';
const router = Router();
import { login, registerUser, logout } from '../Controllers/user.controller.js';
import { isAuth } from '../Middleware/isAuth.middleware.js';


router.route('/login').post(login)
router.post('/logout',  logout)
router.post('/signup',registerUser);

export default router
