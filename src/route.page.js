import express from 'express';
import marked from 'marked';
const router = express.Router();

import PostModel from './models/post';
import config from './config';
import * as auth from './middlewares/auth';

/* Get home page. */
router.get('/', function(req, res, next){
    res.render('index', {title: 'first-app'});
});

/* Get posts page. */
router.get('/posts', function(req, res, next){
    res.render('posts', { title: '我的文章'} );
});

/* Get posts create page. */
router.get('/posts/create', auth.adminRequired, function (req, res, next) {
    res.render('create');
});

/* GET posts show page */
router.get('/posts/show', function(req, res, next){
    const id = req.query.id;

    // PostModel.findOne({_id: id}, function(err, post){
    //     post.content = marked(post.content);
    //     res.render('show', {post});
    // });
    PostModel.findOne({ _id: id })
        .exec()
        .then(post => {
            post.content = marked(post.content);
            res.render('show', { post });
        })
        .catch(next)
});

/* GET posts edit page. */
router.get('/posts/edit', auth.adminRequired, function (req, res, next) {
  const id = req.query.id;

  res.render('edit', { id });
});

/* GET waterfall page. */
router.get('/waterfall_1', function(req, res, next){
    res.render('waterfall_1', { title: 'Gakki瀑布流布局' });
});

router.get('/waterfall_2', function(req, res, next) {
    res.render('waterfall_2', { title: 'Gakki~~~'} );
});

router.get('/waterfall_3', function(req, res, next){
    res.render('waterfall_3', { title: 'WOW~ Gakki!'})
});

/* GET signup page. */
router.get('/signup', function(req, res, next){
    res.render('signup');
});

/* GET signin page. */
router.get('/signin', function(req, res, next){
    res.render('signin');
});

/* GET signout */
router.get('/signout', function (req, res, next) {
  req.session.user = null;
  res.clearCookie(config.cookieName, { path: '/' });
  res.redirect('/');
});

export default router;