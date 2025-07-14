import express from 'express';
import {
  register,
  login,
  logout,
 forgotPassword,
  verifyResetOTP,
  resetPassword,
  verifyEmail,
  getCurrentUser
} from '../controllers/authController.js';
import { protect, authorize } from '../middleware/auth.js';
import {
  validateRegister,
  validateLogin,
  validateEmail,
  validateResetPassword 
} from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post("/verifyEmail",validateEmail,verifyEmail )
router.post('/logout', logout);

router.post('/forgot-password', forgotPassword);
router.post('/verify-reset-otp', verifyResetOTP);
router.post('/reset-password', validateResetPassword, resetPassword);

// Protected routes
router.get('/me', protect, getCurrentUser);


export default router;