const { RateLimiterMemory } = require('rate-limiter-flexible');

const rateLimiter = new RateLimiterMemory({
    points: 10, 
    duration: 60 
});

module.exports = async (req, res, next) => {
    try {
        await rateLimiter.consume(req.ip);
        next();
    } catch {
        res.status(429).json({
            success: false,
            error: 'The request is too frequent, please try again later'
        });
    }
};