//  @login & register 
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const keys = require('../../config/key')
const passport = require('passport')

const User = require('../../models/User');

// $route   GET api/users/test
// @desc    返回请求的json数据
// @access  public
router.get("/test", (request, response) => {
    response.json({ msg: "login works" })
})

// $route   POST api/users/register
// @desc    返回请求的json数据
// @access  public
router.post("/register", (request, response) => {
    // console.log(request.body)

    // 查询数据库中是否拥有邮箱
    User.findOne({ email: request.body.email })
        .then((user) => {
            if (user) {
                return response.status(400).json("邮箱已被注册!")
            } else {
                const avatar = gravatar.url(request.body.email, { s: '200', r: 'pg', d: 'mm' })

                const newUser = new User({
                    name: request.body.name,
                    email: request.body.email,
                    avatar,
                    password: request.body.password,
                    identity: request.body.identity
                })

                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;

                        newUser.password = hash;

                        newUser.save()
                            .then(user => response.json(user))
                            .catch(err => console.log(err))
                    })
                })
            }
        })
})

// $route   POST api/users/login
// @desc    返回token jwt password
// @access  public

router.post("/login", (request, response) => {
    const email = request.body.email;
    const password = request.body.password;
    // 查询数据库
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return response.status(404).json("用户不存在!");
            }

            // 密码匹配
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const rule = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar,
                            identity: user.identity
                        }
                        jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                            if (err) throw err;
                            response.json({
                                success: true,
                                token: "Bearer " + token
                            })
                        })
                        // response.json({ msg: "success" });
                    } else {
                        return response.status(400).json("密码错误!")
                    }
                })
        })
})


// $route   GET api/users/current
// @desc    return current user
// @access  Private
router.get("/current", passport.authenticate("jwt", { session: false }), (request, response) => {
    response.json({
        id: request.user.id,
        name: request.user.name,
        email: request.user.email,
        identity: request.user.identity
    })
})

module.exports = router