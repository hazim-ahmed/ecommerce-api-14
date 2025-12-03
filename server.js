require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const path = require('path');
const winston = require('winston');

// --- استدعاء الاتصال بالقاعدة ---
const { sequelize, testConnection } = require('./config/db');

const app = express();
app.set('trust proxy', 1);
const PORT = process.env.PORT || 3000;

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

// --- Middlewares ---
app.use(cors());
app.use(express.json());

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
  logger.error(err.stack || err.message);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// --- تشغيل السيرفر بعد التحقق من قاعدة البيانات ---
const startServer = async () => {
  await testConnection(); // <-- اختبار الاتصال
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
};

startServer();