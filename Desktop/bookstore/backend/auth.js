const jwt = require('jsonwebtoken');

// Function to generate a token
const generateToken = (user) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d', // Token expires in 1 day
    });
    return token;
};

// Function to verify a token
const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (err) {
        throw new Error('Invalid or expired token');
    }
};

module.exports = { generateToken, verifyToken };