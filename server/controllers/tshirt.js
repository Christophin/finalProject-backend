'use strict';

const Tshirt = require('../models').Tshirt;
const TsFrontImage = require('../models').TsFrontImage;
const TsBackImage = require('../models').TsBackImage;

module.exports = {
    newTshirt (req, res)    {
        Tshirt.create({
            name: req.body.name,
            user_id: req.user.id,
            color: req.body.color,
            ts_front_url: req.body.ts_front_url,
            ts_back_url: req.body.ts_back_url,
            tsFrontImages:   req.body.front_images,
            tsBackImages:    req.body.back_images
        }, {
            include: [{
                model: TsFrontImage,
                as: 'tsFrontImages'
            }, {
                model: TsBackImage,
                as: 'tsBackImages'
            }]
        })
            .then(tshirt => res.status(201).send(tshirt))
            .catch(error => res.status(400).send(error));
    }
};