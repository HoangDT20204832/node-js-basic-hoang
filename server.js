//npm: giúp quản lý các thư viện khi dùng JS
//npm install --save-exact express@4.17.1 : cài famework express phiên bản 4.17.1
//môi 1 máy tính sinh ra 1 node_modules khác nhau nên ko nên share node_modules lên github (và nó cũng nặng)
// => tạo thêm 1 file gitignore: file này giúp ta ghi những file nào ko muốn đẩy lên github
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World! with Hoang')
})
app.get('/hmm', (req, res) => {
    res.send('Đâm nhau khum he')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})