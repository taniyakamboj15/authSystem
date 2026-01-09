import { Request, Response } from 'express';
import User from '../models/userModel';
import generateToken from '../utils/generateToken';
import sendEmail from '../utils/email';
import crypto from 'crypto';

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
const signup = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // @ts-ignore
    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};


const logout = (req: Request, res: Response) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
};


const getUserProfile = async (req: Request, res: Response) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};


const updateUserProfile = async (req: Request, res: Response) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            if (req.body.oldPassword) {
                // @ts-ignore
                if (await user.matchPassword(req.body.oldPassword)) {
                    user.password = req.body.password;
                } else {
                    res.status(401).json({ message: 'Invalid old password' });
                    return;
                }
            } else {
                res.status(400).json({ message: 'Old password is required to set a new password' });
                return;
            }
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};



const forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }


    const otp = Math.floor(100000 + Math.random() * 900000).toString();


    user.otp = otp;

    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    await user.save();

    const message = `Your password reset OTP is ${otp}. It is valid for 10 minutes.`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password Reset OTP',
            message,
        });

        res.status(200).json({ message: 'OTP sent to email' });
    } catch (error) {
        user.otp = undefined;
        // @ts-ignore
        user.otpExpires = undefined;
        await user.save();
        res.status(500).json({ message: 'Email could not be sent' });
    }
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOtp = async (req: Request, res: Response) => {
    const { email, otp } = req.body;

    const user = await User.findOne({
        email,
        otp,
        otpExpires: { $gt: Date.now() }
    });

    if (!user) {
        res.status(400).json({ message: 'Invalid or expired OTP' });
        return;
    }

    res.status(200).json({ message: 'OTP Verified' });
};

// @desc    Reset Password
// @route   POST /api/auth/reset-password
// @access  Public
const resetPassword = async (req: Request, res: Response) => {
    const { email, otp, password } = req.body;

    const user = await User.findOne({
        email,
        otp,
        otpExpires: { $gt: Date.now() }
    });

    if (!user) {
        res.status(400).json({ message: 'Invalid or expired OTP' });
        return;
    }

    user.password = password;
    user.otp = undefined;
    // @ts-ignore
    user.otpExpires = undefined;

    await user.save();

    res.status(200).json({ message: 'Password Reset Successfully' });
};

export {
    signup,
    login,
    logout,
    getUserProfile,
    updateUserProfile,
    forgotPassword,
    verifyOtp,
    resetPassword,
};
