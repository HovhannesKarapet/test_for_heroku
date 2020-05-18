module.exports.data = () => {
    return [
        {
            "model": "roles",
            "documents": [
                {
                    "name": "admin",
                    "is_admin": true,
                    "is_employee": false,
                    "is_guest": false
                },
                {
                    "name": "employee",
                    "is_admin": false,
                    "is_employee": true,
                    "is_guest": false
                },
                {
                    "name": "guest",
                    "is_admin": false,
                    "is_employee": false,
                    "is_guest": true
                }
            ]
        }
    ];
};
