var express = require('express');
var database = require('../config/db_connection');


var router = express.Router();



router.get('/all', function(request, response) {
    if (database != null) {
        database.query('SELECT * FROM news', function(error, results) {
            if (!error) {
                response.render('news-all', { newsList: results });
            }
        })
    }
});

router.get('/create', function(request, response) {
    if (database != null) {
        database.query('SELECT * FROM topic', function(error, topicList) {
            database.query('SELECT * FROM sub_topic', function(error, subTopicList) {
                response.render('create-news', {
                    topics: topicList,
                    subTopics: subTopicList,
                    message: request.flash('message')
                });
            });
        });

    }
});

router.post('/post-form', function(request, response) {
    var news = {
        title: request.body.title,
        sub_title: request.body.sub_title,
        news_source: request.body.news_source,
        news_detail: request.body.news_detail,
        video_link: request.body.video_link,
        news_photo: "",
        is_featured: request.body.is_featured ? true : false,
        is_top_story: request.body.is_top_story ? true : false,
        is_video: request.body.is_video ? true : false,
        is_video_of_the_day: request.body.is_video_of_the_day ? true : false,
    }
    if (request.files) {
        var file = request.files.newsPhoto;
        var fileName = file.name;
        file.mv('./uploads/' + fileName, function(error) {
            if (!error) {
                news.news_photo = fileName;
                if (database != null) {
                    database.query('INSERT INTO news SET ?', news, function(error, result) {
                        if (!error) {
                            request.flash('message', 'News insrted successfully');
                            response.redirect('/news/create');
                        } else {
                            response.send(error);
                        }
                    })
                }
            }
        })
    }
});

module.exports = router;