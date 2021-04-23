const bcrypt = require('bcrypt');

module.exports = {
    hashPassword: (password, salt = 10) =>
        new Promise((resolve, reject) =>
            bcrypt.hash(password, salt, (err, hash) =>
                err ? reject(err) : resolve(hash)
            )
        ),

    verifyPassword: (password, hash) =>
        new Promise((resolve, reject) =>
            bcrypt.compare(password, hash, (err, result) =>
                err ? reject(err) : resolve(result)
            )
        )
};
