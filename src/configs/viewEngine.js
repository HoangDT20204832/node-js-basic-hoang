import express from 'express';

const configViewEngine = (app) => {
    //cho phép thế giới bên ngoài xem được các file trong file public
    app.use(express.static('./src/public'))
    app.set("view engine", "ejs");
    app.set("views", "./src/views");
}

export default configViewEngine;