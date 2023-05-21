//phụ trách tất cả các route trên website của bạn
import express from "express";
import homeController from '../controller/homeController';
import multer from "multer";
import path from "path";
var appRoot = require('app-root-path');

let router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log('check app-root', appRoot);
        cb(null, appRoot +'/src/public/img');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({storage: storage, fileFilter: imageFilter});
let uploadMultiple = multer({storage: storage, fileFilter: imageFilter}).array('multiple_images',3);

const initWebRoute = (app) =>{
    router.get('/', homeController.getHomepage);
    router.get('/detail/user/:id', homeController.getDetailPage);//:id/:name   :các tham số truyền vào
    router.post('/create-new-user', homeController.createNewUser);
    router.post('/delete-user', homeController.deleteUser);
    router.get('/edit-user/:id', homeController.getEditPage);
    router.post('/update-user', homeController.postUpdateUser);

    router.get('/upload-file', homeController.getUploadFilePage);
    router.post('/upload-profile-pic',upload.single('profile_pic'), homeController.handleUploadFile);
    router.post('/upload-multiple-images', (req,res,next) =>{//đây là 1 middleware viết trên router
        uploadMultiple(req,res, (err) =>{
            if(err instanceof multer.MulterError && err.code === 'LIMIT_UNEXPECTED_FILE'){
                 //handle multer file limit error here
                 res.send("LIMIT_UNEXPECTED_FILE");
        }else if(err){
            res.send(err);
        }
        else {
            //make sure to call next() if all was well
            next();
        }
    })
    }, homeController.handleUploadMultipleFile);

    router.get('/hmm', (req, res) => {
        res.send('Đâm nhau khum he')
    })
    return app.use('/', router)//  /abc: thêm tiền tố trước mỗi row: vd:http://localhost:8080/abc/hmm thì mới chạy đc
}

export default initWebRoute;