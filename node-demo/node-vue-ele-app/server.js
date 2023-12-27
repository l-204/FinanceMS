const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const app = express();

// 引入users.js
const users = require("./routes/api/users")

// 引入profile.js
const profiles = require('./routes/api/profiles')

// DB config 
const db = require("./config/key").mongoURI;

// 使用body-parser中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Connect to mongodb
mongoose.connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


// passport 初始化
app.use(passport.initialize());

require('./config/passport')(passport)

// app.get("/", (request, response) => {
//     response.send('hello Vue')
// })

// 使用routes
app.use("/api/users", users);
app.use("/api/profiles", profiles);

const port = process.env.PORT || 9000;

app.listen(port, () => {
    console.log(`服务已经启动,端口${port}正在监听中`)
})