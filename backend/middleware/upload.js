const multer = require('multer');
const path = require('path');
const uploadDir = process.env.UPLOAD_DIR || 'uploads';
const storage = multer.diskStorage({
destination: (req, file, cb) => cb(null, uploadDir),
filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });
module.exports = upload;