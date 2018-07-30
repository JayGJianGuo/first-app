import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import jwt from 'jwt-simple';
import moment from 'moment';

import PostModel from './models/post';
import UserModel from './models/user';
import config from './config';
import * as auth from './middlewares/auth';

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
router.post('/posts', auth.adminRequired, function (req, res, next) {
    // var title = req.body.title;
    // var content = req.body.content;
    const { title, content } = req.body;

    const post = new PostModel();
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
    const id = req.query.id;

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
router.post('/posts/:id', auth.adminRequired, function (req, res, next) {
    // var id = req.body.id;
    // var title = req.body.title;
    // var content = req.body.content;
    const { id, title, content } = req.body;

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
    // var name = req.body.name;
    // var pass = req.body.pass;
    // var rePass = req.body.rePass;
    const { name, pass, rePass } = req.body;

    if(pass !== rePass) {
        return next(new Error('两次密码不对'));
    }

    const user = new UserModel();
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
  const { name, pass } = req.body;

  UserModel.findOne({ name }, function(err, user) {
    if (err || !user) {
      return next(new Error('找不到用户'));
    } else {
      const isOk = bcrypt.compareSync(pass, user.pass);
      if (!isOk) {
        return next(new Error('密码不对'));
      }
      
      const token = jwt.encode(
        {
          _id: user._id,
          name: user.name,
          isAdmin: user.name === config.admin,
          exp: moment().add('days', 30).valueOf(),
        },
        config.jwtSecret
      );

      const opts = {
        path: '/',
        maxAge: moment().add('days', 30).valueOf(),
        signed: true,
        httpOnly: true
      };

      res.cookie(config.cookieName, token, opts);
      res.json({ token });
    }
  });
});

export default router;