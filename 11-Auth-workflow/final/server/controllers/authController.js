const User = require('./../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('./../errors');
const { attachCookiesToResponse, createTokenUser } = require('./../utils');

const register = async (req, res) => {
    const { email, name, password } = req.body;

    const emailAlreadyExists = await User.findOne({ email });
    if(emailAlreadyExists){
        throw new CustomError.BadRequestError('Email already exists')
    }

    // first registered user is admin
    const isFirstUser = await User.countDocuments({}) === 0;
    const role = isFirstUser ? "admin" : "user";

    const user = await User.create({ name, email, password, role });

    // json web token create and set via cookies
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user:tokenUser });

    res.status(StatusCodes.CREATED).json({ user:tokenUser });
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        throw new CustomError.BadRequestError("Please provide email or password");
    }

    const user = await User.findOne({ email });
    if(!user){
        throw new CustomError.UnauthenticatedError("Invalid credentials");
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new CustomError.UnauthenticatedError("Invalid credentials");
    }

    // if everyting is good, create cookie and set it in response object
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user:tokenUser });
    res.status(StatusCodes.OK).json({ user:tokenUser });
}

const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
        // expires: new Date(Date.now() + 5 * 1000),
    });
    res.status(StatusCodes.OK).json({ message:'user logged out!' })
}

module.exports = {
    register,
    login,
    logout
}