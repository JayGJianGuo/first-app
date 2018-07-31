import PostModel from "../models/post";
import UserModel from '../models/user';
import config from '../config';

export const create = function(req, res, next) {
    const { title, content } = req.body;

    const post = new PostModel();
    post.title = title;
    post.content = content;
    post.authorId = res.locals.currentUser._id;
    post.save(function(err, doc) {
        if (err) {
            next(err);
        } else {
            res.json({ post: doc });
        }
    });
};

export const one = function (req, res, next) {
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
};

export const update = function (req, res, next) {
// var id = req.body.id;
// var title = req.body.title;
// var content = req.body.content;
const {
    id,
    title,
    content
} = req.body;

// PostModel.findOneAndUpdate({ _id: id }, { title, content }, function (err) {
//     if (err) {
//         next(err);
//     } else {
//         res.json({});
//     }
// });

PostModel.findOneAndUpdate({
        _id: id
    }, {
        title,
        content
    })
    .exec()
    .then(() => {
        res.json({
            _id: id
        }, {
            title,
            content
        });
    })
    .catch(next);

};

export const more = function (req, res, next) {

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
            res.json({
                postsList: posts
            });
        })
        .catch(next);
};