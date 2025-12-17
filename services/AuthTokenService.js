const jwt = require('jsonwebtoken');
const { ApiKey, User } = require('../models');

/**
 * Service to handle authentication token logic
 */
const AuthTokenService = {

    /**
     * Generate a new JWT and store it in the APIKey table
     * @param {Object} user 
     * @returns {Promise<string>} The generated token
     */
    async generateAndSaveToken(user) {
        // 1. Generate JWT
        const secret = process.env.JWT_SECRET || 'your_super_secret_key';
        const expiresIn = process.env.JWT_EXPIRES_IN || '7d';

        const token = jwt.sign(
            {
                user_id: user.user_id,
                email: user.email,
                user_type: user.user_type
            },
            secret,
            { expiresIn }
        );

        // 2. Calculate expiration date based on expiresIn (e.g., '7d')
        // Simple parsing for '7d' or assuming typical string. 
        // For robustness, we can just imply it or try to parse.
        // If expiresIn is '7d', that's 7 * 24 * 60 * 60 * 1000 ms.
        // Let's rely on the fact usually people set env vars. 
        // We will set expires_at for DB if possible, but it's optional in prompt.
        // Let's create the record.

        let expiresAt = null;
        // Basic parsing for 'xm', 'xh', 'xd'
        if (typeof expiresIn === 'string') {
            const match = expiresIn.match(/^(\d+)([dhm])$/);
            if (match) {
                const val = parseInt(match[1]);
                const unit = match[2];
                const now = new Date();
                if (unit === 'd') expiresAt = new Date(now.getTime() + val * 24 * 60 * 60 * 1000);
                if (unit === 'h') expiresAt = new Date(now.getTime() + val * 60 * 60 * 1000);
                if (unit === 'm') expiresAt = new Date(now.getTime() + val * 60 * 1000);
            }
        }

        // 3. Store in APIKey table
        await ApiKey.create({
            user_id: user.user_id,
            token: token,
            is_active: true,
            expires_at: expiresAt
        });

        return token;
    },

    /**
     * Validate a token from the request
     * @param {string} token 
     * @returns {Promise<Object|null>} The user object if valid, null otherwise
     */
    async validateToken(token) {
        // 1. Verify Signature
        const secret = process.env.JWT_SECRET || 'your_super_secret_key';
        let decoded;
        try {
            decoded = jwt.verify(token, secret);
        } catch (err) {
            return null; // Invalid signature or expired
        }

        // 2. Check DB
        const apiKeyRecord = await ApiKey.findOne({
            where: {
                token: token,
                user_id: decoded.user_id
            },
            include: [{ model: User, as: 'user' }] // We need to fetch the user
        });

        if (!apiKeyRecord) return null;
        if (!apiKeyRecord.is_active) return null;

        // Check DB expiration if set (though JWT verify handles generic expiry, 
        // explicit DB date is good for manual revocation or shorter windows)
        if (apiKeyRecord.expires_at && new Date() > apiKeyRecord.expires_at) {
            return null;
        }

        return apiKeyRecord.user; // Return the associated user
    },

    /**
     * Revoke a token (Logout)
     * @param {string} token 
     */
    async revokeToken(token) {
        if (!token) return;

        await ApiKey.update(
            { is_active: false },
            { where: { token: token } }
        );

        // Alternatively delete it:
        // await ApiKey.destroy({ where: { token: token } });
    }
};

module.exports = AuthTokenService;
