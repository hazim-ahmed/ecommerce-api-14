require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const path = require('path');
const winston = require('winston');


const app = express();
app.set('trust proxy', 1);
const PORT = process.env.PORT || 3000;


// --- Middlewares ---
app.use(cors());
app.use(express.json({ type: ['application/json', 'text/plain'] }));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// --- استدعاء الاتصال بالقاعدة ---
const { sequelize, testConnection } = require('./config/db');





// import routes
app.use('/api', require('./routes/UserRoute'));
app.use('/api', require('./routes/ProductOptionRoute'))
app.use('/api', require('./routes/ProductRoute'));
app.use('/api', require('./routes/OrderRoute'));
app.use('/api', require('./routes/OrderItemRoute'))
app.use('/api', require('./routes/ReviewRoute'));
app.use('/api', require('./routes/BannerRoute'));
app.use('/api', require('./routes/CityRoute'));
app.use('/api', require('./routes/CouponRoute'));
app.use('/api', require('./routes/CouponUsageRoute'));
app.use('/api', require('./routes/NotificationRoute'))
app.use('/api', require('./routes/OrderStatusHistoryRoute'))
app.use('/api', require('./routes/ProductCategoryRoute'))
app.use('/api', require('./routes/StoreRoute'))
app.use('/api', require('./routes/StoreCategoryRoute'))
app.use('/api', require('./routes/TransactionRoute'))
app.use('/api', require('./routes/AddressRoute'))
app.use('/api', require('./routes/AuthRoute'));





// --- Winston Logger ---
const logDir = 'logs';
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join(logDir, 'api-error.log'), level: 'error' }),
    new winston.transports.File({ filename: path.join(logDir, 'api-combined.log') })
  ]
});
global.logger = logger;


const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests from this IP, please try again after 15 minutes' }
});
app.use(apiLimiter);

// --- Placeholder Routes ---
app.get('/', (req, res) => {
  res.send('Server is running');
});

// --- Error Handler ---
app.use((err, req, res, next) => {
  // Log detailed error information
  logger.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    body: req.body
  });

  // Don't expose internal error details in production
  const message = process.env.NODE_ENV === 'production'
    ? 'Internal Server Error'
    : err.message;

  res.status(err.status || 500).json({
    success: false,
    message: message
  });
});

// --- تشغيل السيرفر بعد التحقق من قاعدة البيانات ---
const startServer = async () => {
  try {
    // Test database connection first
    await testConnection();

    // Only start server if DB connection succeeds
    app.listen(PORT, () => {
      logger.info(`✅ Server running on port ${PORT}`);
      logger.info(`   Environment: ${process.env.NODE_ENV || 'development'}`);
      logger.info(`   Ready to accept requests`);
    });
  } catch (error) {
    logger.error('❌ Failed to start server:', error.message);
    logger.error('   Server will not start without database connection');
    process.exit(1); // Exit with error code
  }
};

startServer();