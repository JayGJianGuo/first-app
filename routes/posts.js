var express = require('express');
var router = express.Router();

/* GET posts page. */
router.get('/', function (req, res, next) {
    res.render('posts', {
        title: 'Posts',
        postsList: ['Post1', 'Post2', 'Post3']
    });
});

/* Get postsList 数据 */
router.get('/list', function(req, res,next){
    res.json({postsList: ['Post1', 'Post2', 'Post3']});
});

module.exports = router;
