var express = require('express');
var router = express.Router();

/* Get home page. */
router.get('/', function(req, res, next){
    res.render('index', {title: "Express"});
});

/* Get posts page. */
router.get('/posts', function(req, res, next){
    res.render('posts', { title: 'posts'} );
});

/* Get posts create page. */
router.get('/posts/create', function(req, res, next){
    res.render('create');
});

module.exports = router;