var express = require('express');
var database = require('../config/db_connection');


var router = express.Router();

router.get('/create', function(request, response, next) {
    response.render('topic-create', { message: request.flash('message') });
});

router.post('/post-form', function(request, response, next) {
    if (database != null) {
        database.query('INSERT INTO topic SET ?', request.body,
            function(error, success) {
                if (!error) {
                    request.flash('message', 'Saved successfully');
                    response.redirect('/topics/create');
                } else {
                    response.send(error.message);
                }
            })
    }

});

router.get('/all', function(request, response, next) {
    if (database != null) {
        database.query('SELECT * FROM topic', function(error, results) {
            if (!error) {
                response.render('topics-all', { topics: results, message: request.flash('message') });
            }

        })
    }
});

router.get('/edit/:id', function(request, response, next) {
    if (database != null) {
        database.query('SELECT * FROM topic WHERE id = ?', request.params.id, function(error, data) {
            if (!error) {
                response.send('topics-edit', { topic: data[0] });
            }

        })
    }
});

router.post('/update-form/:id', function(request, response) {

    var topic = {
        topic_name: request.body.topic_name,
        id: request.params.id
    }

    if (database != null) {
        database.query("UPDATE topic SET topic_name = " + "'" +
            topic.topic_name +
            "'" + "WHERE id = ?", topic.id,
            function(error, data) {
                if (!error) {
                    response.send('Success');
                }

            });
    }
});

router.get('/delete/:topicId', function(request, response) {
    if (database != null) {
        database.query('DELETE FROM topic WHERE id =?', request.params.topicId, function(error, data) {
            if (!error) {
                request.flash('message', 'Deleted successfully');
                response.redirect('/topics/all');
            }

        })
    }
});



module.exports = router;