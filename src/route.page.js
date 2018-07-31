import express from 'express';
import marked from 'marked';
const router = express.Router();

import PostModel from './models/post';
import config from './config';
import * as auth from './middlewares/auth';
import * as page from './controllers/page';

/* Get home page. */
router.get('/', page.home);

/* Get posts page. */
router.get('/posts', page.posts);

/* Get posts create page. */
router.get('/posts/create', auth.adminRequired, page.createPost);

/* GET posts show page */
router.get('/posts/show', page.showPost);

/* GET posts edit page. */
router.get('/posts/edit', auth.adminRequired, page.updatePost);

/* GET signup page. */
router.get('/signup', page.signup);

/* GET signin page. */
router.get('/signin', page.signin);

/* GET signout */
router.get('/signout', page.signout);

export default router;