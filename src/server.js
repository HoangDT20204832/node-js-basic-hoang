//npm: giúp quản lý các thư viện khi dùng JS
//npm install --save-exact express@4.17.1 : cài famework express phiên bản 4.17.1
//môi 1 máy tính sinh ra 1 node_modules khác nhau nên ko nên share node_modules lên github (và nó cũng nặng)
// => tạo thêm 1 file gitignore: file này giúp ta ghi những file nào ko muốn đẩy lên github

//View engine: giúp xử lý các điều kiện logic trong file html ( vd như viết các vong lặp if else trong file html)
// const express = require('express')
//cấu hình file môi trường: npm install --save-exac dotenv@10.0.0
//Static files: mục đích: chia sẻ dữ liệu trong file static ra ngoài cho người khác xem
import express from 'express';
import configViewEngine from './configs/viewEngine';
//để chạy câu lệnh process.env.PORT cần lệnh phía dưới
require('dotenv').config();
const app = express();
//muốn kết nối với database thì phải đưa các cổng,... vào file môi trường
const port = process.env.PORT || 8080;
console.log(port);

configViewEngine(app)
app.get('/', function(req, res) {
  res.render('test/index.ejs');
});
app.get('/hmm', (req, res) => {
  res.send('Đâm nhau khum he')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})