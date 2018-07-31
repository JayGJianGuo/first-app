import marked from 'marked';
import PostModel from '../models/post';
import config from '../config';
import * as auth from '../middlewares/auth';

export const home = function (req, res, next) {
    res.render('index', {
        title: 'first-app'
    });
};

export const posts = function (req, res, next) {
    res.render('posts', {
        title: '我的文章'
    });
};

export const createPost = function (req, res, next) {
    res.render('create');
};

export const showPost = function(req, res, next){
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
};

export const updatePost = function (req, res, next) {
  const id = req.query.id;

  res.render('edit', { id });
};

export const signup = function (req, res, next) {
    res.render('signup');
};

export const signin = function (req, res, next) {
    res.render('signin');
};

export const signout = function (req, res, next) {
  res.clearCookie(config.cookieName, { path: '/' });
  res.redirect('/');
};