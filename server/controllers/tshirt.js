'use strict';

const Tshirt = require('../models').Tshirt;

module.exports = {
    newTshirt (req, res)    {
        Tshirt.create({
            name: req.body.name,
            user_id: req.user.id,
            color: req.body.color,
            ts_front_url: req.body.ts_front_url,
            ts_back_url: req.body.ts_back_url
        })
            .then(tshirt => res.status(201).send(tshirt))
            .catch(error => res.status(400).send(error));
    }
};