const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(
        {
            user_id: user.user_id,
            email: user.email,
            user_type: user.user_type
        },
        process.env.JWT_SECRET || 'your_super_secret_key', // Fallback for dev
        {
            expiresIn: process.env.JWT_EXPIRES_IN || '7d'
        }
    );
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET || 'your_super_secret_key');
    } catch (error) {
        return null; // Invalid token
    }
};

module.exports = {
    generateToken,
    verifyToken
};
