var express = require('express');
var router = express.Router();
var PostModel = require('./models/post');

/* Get users lists. */
router.get('/users', function(req, res, next){
    res.send('respond with a resource');
});

/* Get posts lists */
router.get('/posts', function(req, res, next){
    PostModel.find({}, {}, function(err, posts){
        if (err) {
            res.json({ success: false });
            return;
        }
        res.json({ success: true, postsList: posts });
    });
});

/* Post posts */
router.post('/posts/create', function(req, res, next){
    var title = req.body.title;
    var content = req.body.content;

    var post = new PostModel();
    post.title = title;
    post.content = content;
    post.save(function(err, doc){
        res.json({success: true});
    });
});

module.exports = router;