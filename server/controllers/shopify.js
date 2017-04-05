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
            console.log(resp.body);
            console.log(req.body);
            //console.log(error);
            res.status(200).send({ message: "we didn't die!" })
        });
    },
    linkShopify (req, res)  {
        let shop = req.query.shop;
        let apiKey = appSecrets.customTeeApiKey;
        let scope = 'read_products, write_products';
        let redirect = 'https://vast-thicket-97383.herokuapp.com/shopify/auth';
        let nonce = bcrypt.hashSync(req.query.shop);
        ShopifyUser.findOrCreate({
            where: {
                user_id: req.query.user_id
            },
            defaults: {
                shop_name: req.query.shop,
                token: null,
                nonce: nonce
            }
        })
            .then(user => {
                res.redirect(301, `https://${shop}.myshopify.com/admin/oauth/authorize?client_id=${apiKey}&scope=${scope}&redirect_uri=${redirect}&state=${nonce}`)
            })
            .catch(error => res.status(400).send(error))
    },
    authShopify (req, res)  {
        let nonce = req.query.state;
        let code = req.query.code;
        let key = appSecrets.customTeeApiKey;
        let secret = appSecrets.customTeeSecret;
        let shop = req.query.shop;
        console.log(req.query);
        let url = `https://${shop}/admin/oauth/access_token?client_id=${key}&client_secret=${secret}&code=${code}`;
        request({
            url: url,
            method: "POST",
            body: req.body,
            json: true
        }, function(error, resp, body)  {
                console.log(resp.body);
                res.status(200).send(resp)
        })
        // make a POST request to shopify for access token
        // then save access token into database for shopify user
        ShopifyUser.findOne({
            where:  {
                nonce: nonce
            }
        })
            // .then(user =>   {
            //     user.update(req.query.authorization_code, {
            //
            //      })
            // })
            .catch(error => res.status(400).send(error))
    }
};


// user.update(req.query.authorization_code, {
//
// })