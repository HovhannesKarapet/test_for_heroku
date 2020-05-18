const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(12);
const password = bcrypt.hashSync('123456', salt);

module.exports.data = (role_id) => {

        return [
            {
                "model": "users",
                "documents": [
                    {
                        "login": "admin",
                        "password": password,
                        "role": role_id,
                    }
                ]
            }
        ];
};
