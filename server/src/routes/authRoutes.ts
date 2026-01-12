import express from 'express';
import {
    signup,
    login,
    logout,
    getUserProfile,
    updateUserProfile,
    forgotPassword,
    verifyOtp,
    resetPassword,
} from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';
import { validateSignup, validateLogin } from '../middleware/validationMiddleware';

const router = express.Router();

router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

export default router;
