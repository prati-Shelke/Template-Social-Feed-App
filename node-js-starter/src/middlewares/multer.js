const multer = require('multer')


//----------------------FOR STORING PROFILE IMAGE INTO DB---------------------------
const uploadStorage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        // console.log(file)
        const fileName = Date.now() + file.originalname
        cb(null, fileName)
    }
});

//--------------------------------TO UPLOAD PROFILE IMAGE USING MULTER--------------------
const upload = multer({
    storage:uploadStorage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
})

//----------------------FOR STORING POST IMAGE INTO DB---------------------------
const postStorage = multer.diskStorage({
    destination: 'posts/',
    filename: (req, file, cb) => {
        // console.log(file)
        const fileName = Date.now() + file.originalname
        cb(null, fileName)
    }
});

//--------------------------------TO UPLOAD POST IMAGE USING MULTER--------------------
const post = multer({
    storage:postStorage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
})

module.exports = {upload,post}