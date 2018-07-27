var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var PostModel = require('./models/post');
var UserModel = require('./models/user');
var config = require('./config');

/* GET users lists. */
router.get('/users', function (req, res, next) {
    res.send('respond with a resource');
});

/* GET posts lists */
router.get('/posts', function (req, res, next) {

    // PostModel.find({}, {}, function (err, posts) {
    //     if (err) {
    //         next(err);
    //     } else {
    //         res.json({ postsList: posts });
    //     }
    // });
    PostModel.find({}, {})
        .exec()
        .then(posts => {
            res.json({ postsList: posts});
        })
        .catch(next);
});

/* POST create posts */
router.post('/posts', function (req, res, next) {
    var title = req.body.title;
    var content = req.body.content;

    var post = new PostModel();
    post.title = title;
    post.content = content;
    post.authorId = res.locals.currentUser._id;
    // post.save(function (err, doc) {
    //     if (err) {
    //         next(err);
    //     } else {
    //         res.json({ post: doc });
    //     }
    // });
    post.save()
        .then(doc => {
            res.json({ post: doc });
        })
        .catch(next);
});

/* GET one post */
router.get('/posts/:id', function (req, res, next) {
    var id = req.query.id;

    // PostModel.findOne({ _id: id }, function (err, post) {
    //     if (err) {
    //         next(err);
    //     } else {
    //         res.json({ post });
    //     }
    // });
    PostModel.findOne({ _id: id })
        .exec()
        .then( () => {
            res.json({ post });
        })
        .catch(next);
});


/* PATCH edit post */
router.post('/posts/:id', function (req, res, next) {
    var id = req.body.id;
    var title = req.body.title;
    var content = req.body.content;

    // PostModel.findOneAndUpdate({ _id: id }, { title, content }, function (err) {
    //     if (err) {
    //         next(err);
    //     } else {
    //         res.json({});
    //     }
    // });

    PostModel.findOneAndUpdate({ _id: id }, { title, content })
        .exec()
        .then( () => {
            res.json({
                _id: id
            }, {
                title,
                content
            });
        })
        .catch(next);

});

/* POST signup user */
router.post('/signup', function(req, res, next){
    var name = req.body.name;
    var pass = req.body.pass;
    var rePass = req.body.rePass;

    if(pass !== rePass) {
        return next(new Error('两次密码不对'));
    }

    var user = new UserModel();
    user.name = name;
    user.pass = bcrypt.hashSync(pass, 10);
    // user.save(function(err) {
    //     if(err) {
    //         next(err);
    //     } else {
    //         res.end();
    //     }
    // });

    user.save()
        .then(() => {
            res.end();
        })
        .catch(next);
});

/* POST signin user */
router.post('/signin', function(req, res, next) {
    var name = req.body.name || '';
    var pass = req.body.pass || '';

    UserModel.findOne({ name }, function(err, user){
        if (err || !user) {
            return next(new Error('找不到用户'));
        } else {
            var isOk = bcrypt.compareSync(pass, user.pass);
            if (!isOk) {
                return next(new Error('密码不对'));
            }

            var authToken = user._id;
            var opts = {
                path: '/',
                maxAge: 1000 * 60 * 60 * 24 * 30, //cookie 有效期30天
                signed: true,
                httpOnly: true
            };

            res.cookie(config.cookieName, authToken, opts);
            res.end();
        }
    });
});

module.exports = router;