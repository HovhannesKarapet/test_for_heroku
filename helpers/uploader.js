const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/');
    },
    filename: (req, file, cb) => {
        let file_type = '';
        if (file.mimetype === 'image/gif') {
            file_type = 'gif';
        }
        if (file.mimetype === 'image/png') {
            file_type = 'png';
        }
        if (file.mimetype === 'image/jpg') {
            file_type = 'jpg';
        }
        if (file.mimetype === 'image/jpeg') {
            file_type = 'jpg';
        }
        cb(null, 'image-' + Date.now() + '.' + file_type);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (
            !(file.mimetype === 'image/gif') &&
            !(file.mimetype === 'image/png') &&
            !(file.mimetype === 'image/jpg') &&
            !(file.mimetype === 'image/jpeg')
        ) {
            return cb(null, false, new Error("Only images are allowed"));
        }
        cb(null, true);
    }
});

module.exports = upload;
