import pool from "../configs/connectDB";
import multer from "multer";
let getHomepage = async(req, res) => {
    //logic
    // let data =[];
    //  connection.query(
    //       'SELECT * FROM `user`',
    //       function(err, results, fields) {
    //         results.map((row)=>{
    //             data.push({
    //                 id: row.id,
    //                 firstName: row.firstName,
    //                 lastName: row.lastName,
    //                 email: row.email,
    //                 address: row.address
    //             })
    //         });
    //        return res.render('index.ejs', {dataUser: data, test: 'hmm'});
    //       });
          const [rows, fields] = await pool.execute('SELECT * FROM user');//khi sử dụng await thì phải thêm async vào đầu hàm
            return res.render('index.ejs', {dataUser: rows, test: 'hmm'});
     //truyền vào 2 tham số: tham soos1: tên file view engine muốn truyền vào
                            //tham số 2: các dữ liệu từ file homeController muốn truyền sang file view engine
    
}

let getDetailPage = async(req, res) => {
    let userId = req.params.id; //reqq.params : gọi ra các tham số truyền vào trên url
    let [user] = await pool.execute('select * from user where `id` = ?', [userId]); // '?':giá trị truyền động; [a,b]: các tham số truyền vào giá trị ?
    return res.send(JSON.stringify(user[0]));
}
let createNewUser = async(req, res) => {
    //thêm mới dữ liệu vào database từ phía client
    let {firstName, lastName, email, address} = req.body
    await pool.execute('insert into user(firstname, lastname, email, address) values(?,?,?,?)',[firstName, lastName, email, address])
    return res.redirect('/');//giúp bạn chuyển hướng người dùng đến một URL khác bằng cách gửi phản hồi HTTP với trạng thái 302
}

let deleteUser = async(req, res) => {
    let userid = req.body.userId;
    await pool.execute('delete from user where id = ?',[userid]);
    return res.redirect('/');//khi ấn nút sẽ load về trang chủ
}

let getEditPage = async(req, res) => {
    let id = req.params.id;
    let [user] = await pool.execute(`select * from user where id = ?`, [id]);//hàm này trả về 1 mảng gồm 2 phần tử object[{}, {}]
    return res.render('update.ejs', {dataUser: user[0]}); //user[0] lấy phần tử thứ 1 : thông tin các bảng của user, phần tử thứ 2 là các fields
}

let postUpdateUser = async(req,res) =>{
    let {firstName,lastName, email, address, id} = req.body;
    await pool.execute('update user set firstName = ?, lastName = ?, email = ?, address = ? where id = ?',
        [firstName,lastName,email,address,id]);
    return res.redirect('/');//khi ấn nút sẽ load về trang chủ
}

let getUploadFilePage = async(req, res) => {
    return res.render('uploadFile.ejs')
};

let handleUploadFile = async(req, res) => {
       // 'profile_pic' is the name of our file input field in the HTML form
       console.log(req.file)
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="/img/${req.file.filename}" width="500"><hr /><a href="/upload-file">Upload another image</a>`);
}

let handleUploadMultipleFile = async (req, res) => {
 // 10 is the limit I've defined for number of uploaded files at once
    // 'multiple_images' is the name of our file input field
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.files) {
            return res.send('Please select an image to upload');
        }

        let result = "You have uploaded these images: <hr />";
        const files = req.files;
        console.log('check file', files);

        let index, len;
        // Loop through all the uploaded images and display them on frontend
        for (index = 0, len = files.length; index < len; ++index) {
            result += `<img src="/img/${files[index].filename}" width="300" style="margin-right: 20px;">`;
        }
        result += '<hr/><a href="/upload-file">Upload more images</a>';
        res.send(result);
}
//voi html chi dung dc 2 giao thuc GET vaf POST; 
//voi GET thi dung req.params , voi POST thi dung req.body;
module.exports = {
    getHomepage,getDetailPage,createNewUser,deleteUser,getEditPage,postUpdateUser,
    getUploadFilePage,handleUploadFile,handleUploadMultipleFile
}