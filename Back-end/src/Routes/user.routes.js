import { Router } from 'express';
const router = Router();
import { login, registerUser, logout, refreshToken } from '../Controllers/user.controller.js';


router.route('/login').post(login)
router.post('/logout',  logout)
router.post('/signup',registerUser);
router.post('/refresh-token',refreshToken);

export default router
