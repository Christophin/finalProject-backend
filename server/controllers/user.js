const User = require('../models').User;
const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple');
const appSecrets = require ('../config/secrets');

module.exports = {
    getUsers (req, res) {
        User.findAll()
            .then(users => res.status(201).send(users))
            .catch(error => res.status(401).send(error));
    },
    register (req, res) {
        let salt = bcrypt.genSaltSync(10);
        let hashedPass = bcrypt.hashSync(req.body.password, salt);
        User.create({
            email: req.body.email,
            password: hashedPass,
            salt: salt,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
        })
            .then(user => res.status(201).send(user))
            .catch(error => res.status(400).send(error));
    },
    login (req, res)    {
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(user =>   {
            if(!user)   {
            return res.status(401).send({message: 'No records match' })
            }
        let input = bcrypt.hashSync(req.body.password, user.salt);
        if (input === user.password)    {
            let token = jwt.encode({ id: user.id, email: user.email}, appSecrets.jwtSecret);
            let json = {
                user: user,
                token: token
            };
            return res.status(201).send(json)
        } else  {
            return res.status(401).send({message: 'No records match'})
        }
    })
    .catch(error => res.status(400).send(error));
    },
    getUser(req, res)   {
        User.findById(req.params.id)
            .then(user => res.status(201).send(user))
    .catch(error => res.status(401).send(error))
    }
};