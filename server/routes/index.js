const UserController = require('../controllers/user');
const ClipartController = require('../controllers/clipart');
const TshirtController = require('../controllers/tshirt');
const middleware = require('../middleware');

module.exports = (app) => {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, access-token");
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
};
