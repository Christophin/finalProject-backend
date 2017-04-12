const UserController = require('../controllers/user');
const ClipartController = require('../controllers/clipart');
const TshirtController = require('../controllers/tshirt');
const ShopifyController = require('../controllers/shopify');
const middleware = require('../middleware');

module.exports = (app) => {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, access-token, access_token");
        res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS");
        next();
    });
    app.get('/users', UserController.getUsers);
    app.post('/users', UserController.register);
    app.get('/user/:id', UserController.getUser);
    app.post('/login', UserController.login);

    app.get('/cliparts', ClipartController.getCliparts);
    app.post('/cliparts', ClipartController.newClipart);

    app.post('/tshirt', middleware.authenticate, TshirtController.newTshirt);
    app.get('/tshirt', middleware.authenticate, TshirtController.getTshirts);
    app.put('/tshirt/:id', middleware.authenticate, TshirtController.updateTshirt);
    app.get('/tshirttest', TshirtController.getTshirtTest);
    app.delete('/tshirt/:id', TshirtController.destroyTshirt);

    app.post('/shopify/add', middleware.authenticate, ShopifyController.addShirt);
    app.get('/shopify/link', middleware.authenticate, ShopifyController.linkShopify);
    app.get('/shopify/auth', ShopifyController.authShopify);
    app.get('/shopify/user', middleware.authenticate, ShopifyController.getUser);
    app.post('/shopify/tossShirt', middleware.authenticate, ShopifyController.tossShirt);
};
