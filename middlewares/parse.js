const multer = require('multer');
const upload =multer();

module.exports = {
    JSONParse: (fields) => {
        if (Array.isArray(fields)) {
            return (req, res, next) => {

                fields.forEach(item => {
                    req.body[item] = JSON.parse(req.body[item]);
                });

                next();
            }
        } else {
            return (req, res, next) => {
                req.body[fields] = JSON.parse(req.body[fields]);

                next();
            }
        }
    },
};
