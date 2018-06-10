var express = require('express');
var router = express.Router();
var PostModel = require('./models/post');
var marked = require('marked');

/* Get home page. */
router.get('/', function(req, res, next){
    res.render('index', {title: 'first-app'});
});

/* Get posts page. */
router.get('/posts', function(req, res, next){
    res.render('posts', { title: '我的文章'} );
});

/* Get posts create page. */
router.get('/posts/create', function(req, res, next){
    res.render('create');
});

/* GET posts show page */
router.get('/posts/show', function(req, res, next){
    var id = req.query.id;

    PostModel.findOne({_id: id}, function(err, post){
        post.content = marked(post.content);
        res.render('show', {post});
    });
});

/* GET posts edit page. */
router.get('/posts/edit', function (req, res, next) {
  var id = req.query.id;

  res.render('edit', { id });
});

module.exports = router;