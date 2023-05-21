//npm: giúp quản lý các thư viện khi dùng JS
//npm install --save-exact express@4.17.1 : cài famework express phiên bản 4.17.1
//môi 1 máy tính sinh ra 1 node_modules khác nhau nên ko nên share node_modules lên github (và nó cũng nặng)
// => tạo thêm 1 file gitignore: file này giúp ta ghi những file nào ko muốn đẩy lên github

//View engine: giúp xử lý các điều kiện logic trong file html ( vd như viết các vong lặp if else trong file html)
// const express = require('express')
//cấu hình file môi trường: npm install --save-exac dotenv@10.0.0
//ko share file .env lên git
//Static files: mục đích: chia sẻ dữ liệu trong file static ra ngoài cho người khác xem
//MVC: 
//Middleware:người đứng giữa yêu cầu (request) và nguồn tài nguyên (resource) của máy chủ, 
//là thứ quyết định yêu cầu có thể được thực hiện hay là bị từ chối. Bằng cách sử dụng middleware, chúng ta có thể phân quyền người dùng, 
//cho phép người dùng truy cập vào một tài nguyên nhất định và còn nhiều hơn thế nữa.
//Middleware ban chat la 1 function, nó chạy lần lượt từ trên xuống dưới
import express from 'express';
import configViewEngine from './configs/viewEngine';
//để chạy câu lệnh process.env.PORT cần lệnh phía dưới
import initWebRoute from './route/web';
import initAPIRoute from './route/api';
// import connection from './configs/connectDB'
require('dotenv').config();
var morgan = require('morgan');

const app = express();
//muốn kết nối với database thì phải đưa các cổng,... vào file môi trường
const port = process.env.PORT || 8080;
//tự tạo 1 middleware của mình trên app: gồm 3 tham số req, res, next
app.use((req, res, next) => {
  console.log('>> run into my middleware');
  console.log(req.method)
  //khi req hop le thì ta muốn cho nó đi tiếp thì ta dùng hàm next(); để nó chạy xuống các câu lệnh sau đó
  next();
})

app.use(morgan('combined'))
//hỗ trợ gửi data từ phía client lên phái server 1 cách đơn giản, cũng như giảm thiểu hóa lượng data gưỉ lên server
//bản chất là 1 middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true}));

console.log(port);

//setup viewEngine
configViewEngine(app);
//init web route
initWebRoute(app);

//init api route
initAPIRoute(app);

//handle 404 not found:la 1 middleware nếu ko có các đường link code(router đã code) thì sẽ render ra 404 not found
app.use((req, res) =>{
  return res.render('404.ejs')
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
}) 