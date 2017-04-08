'use strict';

const appSecrets = require('../config/secrets');
const request = require('request');
const bcrypt = require('bcryptjs');
const ShopifyUser = require('../models').ShopifyUser;

module.exports = {
    addShirt (req, res) {
        let key = appSecrets.shopifyApiKey;
        let pass = appSecrets.shopifyPassword;
        let host = 'simax-sports.myshopify.com/admin/products.json';
        let url = `https://${key}:${pass}@${host}`;
        request({
            url: url,
            method: "POST",
            body: req.body,
            json: true
        }, function (error, resp, body) {
            if (error) {
                return res.status(400).send(error)
            }
            res.status(200).send({ message: "we didn't die!" })
        });
    },
    linkShopify (req, res)  {
        console.log("confirming assumptions inside linkShopify");
        let shop = req.query.shop;
        let apiKey = appSecrets.customTeeApiKey;
        let scope = 'read_products, write_products';
        let redirect = 'https://vast-thicket-97383.herokuapp.com/shopify/auth';
        let nonce = bcrypt.hashSync(req.query.shop);
        let url = `https://${shop}.myshopify.com/admin/oauth/authorize?client_id=${apiKey}&scope=${scope}&redirect_uri=${redirect}&state=${nonce}`;
        ShopifyUser.findOrCreate({
            where: {
                user_id: req.user.id
            },
            defaults: {
                shop_name: req.query.shop,
                token: null,
                nonce: nonce
            }
        })
            .then(user => {
                res.status(201).send({ url: url })
            })
            .catch(error => {
                console.log(error);
                res.status(400).send(error);
            })
    },
    authShopify (req, res)  {
        let nonce = req.query.state;
        let code = req.query.code;
        let key = appSecrets.customTeeApiKey;
        let secret = appSecrets.customTeeSecret;
        let shop = req.query.shop;
        let url = `https://${shop}/admin/oauth/access_token?client_id=${key}&client_secret=${secret}&code=${code}`;
        request({
            url: url,
            method: "POST",
            body: req.body,
            json: true
        }, function (err, resp, body) {
            ShopifyUser.findOne({
                where: {
                    nonce: nonce
                }
            })
            .then(user => {
                if (!user) {
                    res.send({ message: "oh fuck" })
                }
                user.update({
                    token: resp.body.access_token
                })
                    .then(user => {
                        res.redirect(301, `http://localhost:8080/#!/user/${user.id}`)
                    })
            })
            .catch(error => {
                console.log(error);
                res.status(400).send(JSON.stringify(error));
            })
        })
    },
    getUser(req, res) {
        ShopifyUser.findOne({
            where:  {
                user_id: req.user.id
            }
        })
            .then(user => res.status(200).send(user))
            .catch(error => res.status(400).send(error))
    },
    tossShirt(req, res) {
        ShopifyUser.findOne({
            where: {
                user_id: req.user.id
            }
        })
            .then(user => {
                let shop = user.shop_name;
                let url = `https://${shop}.myshopify.com/admin/products.json`;
                let header = user.token;
                let frontImg = req.body.product.frontImg;
                let backImg = req.body.product.backImg;
                let title = req.body.product.title;
                let vendor = req.body.product.store.vendor;
                let product_type = req.body.product.store.product_type;
                let price = req.body.product.store.price;
                let data = {
                    product: {
                        title: title,
                        vendor: vendor,
                        product_type: product_type,
                        price: Number(price),
                        images: [
                            {src: frontImg},
                            {src: backImg}
                        ]
                    }
                };
                request({
                    url: url,
                    method: "POST",
                    body: data,
                    json: true,
                    headers: {
                        "X-Shopify-Access-Token": header
                    }
                }, function (error, resp, body) {
                    if (error) {
                        return res.status(400).send(error)
                    }
                    res.status(200).send(resp)
                });

            })
    }
};