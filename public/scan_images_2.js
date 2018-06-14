var fs = require('fs');

var writeFilePath = './all_images_info.json';

var readFilePath = '../../../Pictures/1.Gakki/Fashion\ Photo\ Magazine\ 2012/';

const readFile = file => {
    return new Promise((resolve, reject) => {
        return fs.readdir(file, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

readFile(readFilePath)
    .then(data => {
        return data.map (v => {
            return Object.assign(
                {},
                {
                    src: v
                }
            )
        })
    })
    .then(data => {
        let result = {
            data: data
        }
        console.log(result);
    })