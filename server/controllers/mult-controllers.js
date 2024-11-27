const multer  = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

function upload_img(collection) {
    const storage = new GridFsStorage({
        url: process.env.CLUSTER,
        file: (req, file) => { // TODO - These args aren't being used ... do I need them here?
            return new Promise((resolve, _reject) => {
                const fileInfo = {
                    bucketName: collection
                }
                resolve(fileInfo);
            })
        }
    });
    return multer({ storage });
}

module.exports = {
    upload_img
}