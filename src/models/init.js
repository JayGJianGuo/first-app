import mongoose from 'mongoose';
import config from '../config';

const db = mongoose.connect('mongodb://localhost:32768/firstapp', {
    useMongoClient: true
});

db.on('error', function (err) {
    console.log(err);
});

db.once('open', function () {
    console.log('mongodb connect successed!')
});
