'use strict';

const Tshirt = require('../models').Tshirt;
const TsFrontImage = require('../models').TsFrontImage;
const TsBackImage = require('../models').TsBackImage;
const TsFrontText = require('../models').TsFrontText;
const TsBackText = require('../models').TsBackText;

module.exports = {
    newTshirt (req, res)    {
        Tshirt.create({
            name: req.body.name,
            user_id: req.user.id,
            color: req.body.color,
            ts_front_url: req.body.ts_front_url,
            ts_back_url: req.body.ts_back_url,
            tsFrontImages:   req.body.tsFrontImages,
            tsBackImages:    req.body.tsBackImages,
            tsFrontText: req.body.tsFrontText,
            tsBackText: req.body.tsBackText
        }, {
            include: [{
                model: TsFrontImage,
                as: 'tsFrontImages'
            }, {
                model: TsBackImage,
                as: 'tsBackImages'
            }, {
                model: TsFrontText,
                as: 'tsFrontText'
            }, {
                model: TsBackText,
                as: 'tsBackText'
            }]
        })
            .then(tshirt => res.status(201).send(tshirt))
            .catch(error => res.status(400).send(error));
    },
    getTshirts (req, res)   {
        Tshirt.findAll({
            include: [
                { model: TsFrontImage,
                    as: 'tsFrontImages'
                }, {
                    model: TsBackImage,
                    as: 'tsBackImages'
                }, {
                    model: TsFrontText,
                    as: 'tsFrontText'
                }, {
                    model: TsBackText,
                    as: 'tsBackText'
                }
            ],
            where:    {
                user_id: req.user.id
            }
        })
            .then(tshirts => res.status(200).send(tshirts))
            .catch(error => {
              console.log(req.user);
              res.status(400).send(error)
            });
    },
    getTshirtTest (req, res)   {
        Tshirt.findAll({})
            .then(tshirts => res.status(200).send(tshirts))
            .catch(error => {
                console.log(req.user);
                res.status(400).send(error)
            });

    },
    updateTshirt (req, res) {
        Tshirt.findById(req.params.id, {
            include: [
                { model: TsFrontImage,
                    as: 'tsFrontImages'
                }, {
                    model: TsBackImage,
                    as: 'tsBackImages'
                }, {
                    model: TsFrontText,
                    as: 'tsFrontText'
                }, {
                    model: TsBackText,
                    as: 'tsBackText'
                }
            ]
        })
            .then(tshirt => {
                tshirt.update(req.body, {
                    include:    [
                        { model: TsFrontImage,
                            as: 'tsFrontImages'
                        }, {
                            model: TsBackImage,
                            as: 'tsBackImages'
                        }, {
                            model: TsFrontText,
                            as: 'tsFrontText'
                        }, {
                            model: TsBackText,
                            as: 'tsBackText'
                        }
                    ],
                    fields: ['name','color','ts_front_url','ts_back_url','tsFrontImages','tsBackImages','tsFrontText','tsBackText']
                })
                    .then(tshirt => res.status(201).send(tshirt))
                    .catch(error => res.status(400).send(error));
            })
    },
    destroyTshirt(req, res) {
        Tshirt.destroy({
            include:    [
                { model: TsFrontImage,
                    as: 'tsFrontImages'
                }, {
                    model: TsBackImage,
                    as: 'tsBackImages'
                }, {
                    model: TsFrontText,
                    as: 'tsFrontText'
                }, {
                    model: TsBackText,
                    as: 'tsBackText'
                }
            ],
            where:  {
                id: req.params.id
            }
        })
            .then(rows => res.status(204).send({ deletedCount: rows }))
            .catch(error => {
                console.log(error);
                res.status(400).send(error);
            })
    }
};