'use strict';
const Clipart = require('../models').Clipart;


module.exports = {
    getCliparts(req, res)    {
        console.log(req.query.category);
        Clipart.findAll({
            where: {category: req.query.category}
        })
            .then(cliparts => res.status(200).send(cliparts))
            .catch(error => res.status(400).send(error));
    },
    newClipart(req, res)    {
        Clipart.create({
            name: req.body.name,
            url: req.body.url,
            category: req.body.category
        })
            .then(clipart => res.status(201).send(clipart))
            .catch(error => res.status(400).send(error));
    }
};