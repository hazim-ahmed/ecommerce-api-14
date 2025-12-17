const AuthTokenService = require('../services/AuthTokenService');
const { User } = require('../models');

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Malformed token' });
        }

        // Verify token against database (checks signature, existence, activity, and expiration)
        const user = await AuthTokenService.validateToken(token);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
        }

        if (user.user_status === 'blocked' || user.user_status === 'inactive') {
            return res.status(403).json({ message: 'Forbidden: User account is not active' });
        }

        // Attach user to request object
        req.user = user;
        next();

    } catch (error) {
        console.error("Auth Middleware Error:", error);
        return res.status(500).json({ message: 'Server error during authentication' });
    }
};

// Optional: specific role middleware
const authorize = (roles = []) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (roles.length && !roles.includes(req.user.user_type)) {
            return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
        }

        next();
    };
};

module.exports = {
    authenticate,
    authorize
};
