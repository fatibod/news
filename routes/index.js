var express = require('express');
var router = express.Router();
var database = require('../config/db_connection');

router.get('/testconnection', function(request, response, next) {
    if (database != null) {
        response.send('connect successfully');
    } else {
        response.send('connect is failed');
    }
})

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/*  POST home page.*/

router.post('/post-form', function(req, res, next) {
    res.res('Hello');

});

module.exports = router;