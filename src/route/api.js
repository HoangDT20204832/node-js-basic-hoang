//phụ trách tất cả các route trên website của bạn
import express from "express";
import APIController from "../controller/APIController";
let router = express.Router();

const initAPIRoute = (app) =>{
    router.get('/users', APIController.getAllUsers); //method :GET:read data
    router.post('/create-user', APIController.createNewUser); //method :POST ->create data
    router.put('/update-user', APIController.updateUser); //method :PUT ->update data
    router.delete('/delete-user/:id', APIController.deleteUser); //method :POST ->create data

    return app.use('/api/v1/', router)//  /abc: thêm tiền tố trước mỗi row: vd:http://localhost:8080/abc/hmm thì mới chạy đc
}

export default initAPIRoute;