import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import jwt from 'jwt-simple';
import moment from 'moment';

import PostModel from './models/post';
import UserModel from './models/user';
import config from './config';
import * as auth from './middlewares/auth';
import * as post from './controllers/post';
import * as user from './controllers/user';


/* GET users lists. */
router.get('/users', user.more);

/* GET posts lists */
router.get('/posts', post.more);

/* POST create posts */
router.post('/posts', auth.adminRequired, post.create);

/* GET one post */
router.get('/posts/:id', post.one);

/* PATCH edit post */
router.post('/posts/:id', auth.adminRequired, post.update);

/* POST signup user */
router.post('/signup', user.signup);

/* POST signin user */
router.post('/signin', user.signin);

export default router;