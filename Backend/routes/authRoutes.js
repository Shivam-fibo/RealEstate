import express from 'express';
import {
  register,
  login,
  logout,
  resetPassword,
  getCurrentUser,
  resendOTP
} from '../controllers/authController.js';
import { protect, authorize } from '../middleware/auth.js';
import {
  validateRegister,
  validateLogin,
} from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/logout', logout);
router.post('/reset-password', resetPassword);
router.post('/resend-otp', resendOTP);

// Protected routes
router.get('/me', protect, getCurrentUser);

// Example protected routes with role-based access
router.get('/builder-only', protect, authorize('builder'), (req, res) => {
  res.json({
    success: true,
    message: 'This is a builder-only route',
    user: req.user
  });
});

router.get('/user-only', protect, authorize('user'), (req, res) => {
  res.json({
    success: true,
    message: 'This is a user-only route',
    user: req.user
  });
});

export default router;