//phụ trách tất cả các route trên website của bạn
import express from "express";
import homeController from '../controller/homeController';
let router = express.Router();

const initWebRoute = (app) =>{
    router.get('/', homeController.getHomepage);
    router.get('/detail/user/:id', homeController.getDetailPage);//:id/:name   :các tham số truyền vào
    router.post('/create-new-user', homeController.createNewUser);
    router.get('/hmm', (req, res) => {
        res.send('Đâm nhau khum he')
    })
    return app.use('/', router)//  /abc: thêm tiền tố trước mỗi row: vd:http://localhost:8080/abc/hmm thì mới chạy đc
}

export default initWebRoute;