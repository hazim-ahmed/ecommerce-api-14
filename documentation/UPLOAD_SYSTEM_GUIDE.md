# Image Upload System & Migration Guide

## Overview
The current system uses a **local storage** mechanism with **Multer**.
- **Middleware**: `middleware/upload.js` handles file acceptance, naming, and storage filtering.
- **Controller**: `ProductController.js` is storage-agnostic. It saves the public URL of the image.
- **Database**: Stores URLs as a JSON array in the `product_images` column.
- **Static Serving**: Files are served from `/uploads` via Express static middleware.

## switching to Cloud Storage (Future Migration)
To switch to a cloud provider (Cloudinary, AWS S3, etc.), you **ONLY** need to modify `middleware/upload.js`.

### 1. Cloudinary Migration
**Installation:**
```bash
npm install cloudinary multer-storage-cloudinary
```

**Modify `middleware/upload.js`:**
```javascript
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'products',
    allowed_formats: ['jpg', 'png', 'webp'],
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
```

### 2. AWS S3 Migration
**Installation:**
```bash
npm install aws-sdk multer-s3
```

**Modify `middleware/upload.js`:**
```javascript
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION
});

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'your-bucket-name',
        acl: 'public-read',
        key: function (req, file, cb) {
            cb(null, 'products/' + Date.now().toString())
        }
    })
});

module.exports = upload;
```

## Why This Architecture?
The **Controller** logic has been updated to check for `file.location` (AWS S3) or `file.path` (Cloudinary URL).
- If these exist, it uses them as the URL.
- If not, it falls back to the local `FILE_BASE_URL` logic.
- **Zero changes** are needed in the controller or database when you switch providers.

## Database
We store `product_images` as a JSON column (Array of Strings).
Example:
```json
["https://your-cloud-custom-domain.com/image1.jpg", "https://your-cloud-custom-domain.com/image2.jpg"]
```
This is scalable and does not bloat the database with binary formatting.
