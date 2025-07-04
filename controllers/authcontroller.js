
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const catchAsyncError = require('../middleware/catchAsyncError.js');
const dotenv = require('dotenv');
dotenv.config({ path: '../config/.env' });
const JWT_SECRET = process.env.JWT_SECRET;
//register new user
exports.registeruser = catchAsyncError(async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
        return res.stutas(400).json({
            success: false,
            message: "Please enter all fields"
        });
    }
    const existingUser = await User.find({ email: email });
    if (existingUser.length > 0) {
        return res.status(400).json({
            success: false,
            message: "User already exists with this email",
        })
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name: name,
        email: email,
        password: hashedpassword,
        role: role || 'student'

    });
    const JWT_SECRET = process.env.JWT_SECRET;
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30d' });
    res.status(201).json({
        sucess: true,
        message: "User registered successfuly",
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        token: token,
    });

});

//login user
exports.loginuser = catchAsyncError(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please enter you email and password to login"

        })
    }
    const user = await User.findOne({ email: email }).select('+password');
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "User does not exist with this email"
        })
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
        return res.status(400).json({
            success: false,
            message: "Invalid email or password"
        })
    }
    const JWT_SECRET = process.env.JWT_SECRET;
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30d' });
    res.status(200).json({
        success: true,
        message: "User Logged in successfully",
        
    });
});


    
