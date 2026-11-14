import express from 'express';
import { loginAdmin, verifyAdminSession } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.get('/verify', verifyAdminSession);

export default router;

