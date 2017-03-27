const jwt = require('jwt-simple');
const appSecrets = require('../config/secrets');
const User = require('../models').User;

module.exports = {
    authenticate (req, res, next)   {
        let token = req.headers['access-token'];
        if(!token)  {
            res.status(401).send({
                message: 'Must be authenticated to use this route.'
            });
        }
        try {
            let decoded = jwt.decode(token, appSecrets.jwtSecret);
            let userId = decoded.id;
            User.findById(userId).then(user =>  {
                if (!user)  {
                    res.status(401).send({
                        message: 'Error during authentication'
                    });
                }
                req.user = user;
                next();
            })
        } catch (error) {
            res.status(401).send({
                message: 'Invalid token.'
            })
        }
    }
};