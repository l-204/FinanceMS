//  @login & register 
const express = require('express');
const router = express.Router();
const passport = require('passport')

const Profile = require('../../models/Profile');

// $route   GET api/profiles/test
// @desc    返回请求的json数据
// @access  public
router.get("/test", (request, response) => {
    response.json({ msg: "profile works" })
})

// $route   POST api/profiles/add
// @desc    创建信息接口
// @access  Private
router.post("/add", passport.authenticate('jwt', { session: false }), (request, response) => {
    const profileFields = {};

    if (request.body.type) profileFields.type = request.body.type;
    if (request.body.describe) profileFields.describe = request.body.describe;
    if (request.body.income) profileFields.income = request.body.income;
    if (request.body.expend) profileFields.expend = request.body.expend;
    if (request.body.cash) profileFields.cash = request.body.cash;
    if (request.body.remark) profileFields.remark = request.body.remark;

    new Profile(profileFields).save().then(profile => {
        response.json(profile);
    })
})

// $route   GET api/profiles
// @desc    获取所有信息
// @access  Private

router.get("/", passport.authenticate('jwt', { session: false }), (request, response) => {
    Profile.find()
        .then(profile => {
            if (!profile) {
                return response.status(404).json("没有任何内容")
            }
            response.json(profile)
        }).catch((err) => response.status(404).json(err))
})

// $route   GET api/profiles/:id
// @desc    获取单个信息
// @access  Private

router.get("/:id", passport.authenticate('jwt', { session: false }), (request, response) => {
    Profile.findOne({ _id: request.params.id })
        .then(profile => {
            if (!profile) {
                return response.status(404).json("没有任何内容")
            }
            response.json(profile)
        }).catch((err) => response.status(404).json(err))
})

// $route   POST api/profiles/edit
// @desc    编辑信息接口
// @access  Private
router.post("/edit/:id", passport.authenticate('jwt', { session: false }), (request, response) => {
    const profileFields = {};

    if (request.body.type) profileFields.type = request.body.type;
    if (request.body.describe) profileFields.describe = request.body.describe;
    if (request.body.income) profileFields.income = request.body.income;
    if (request.body.expend) profileFields.expend = request.body.expend;
    if (request.body.cash) profileFields.cash = request.body.cash;
    if (request.body.remark) profileFields.remark = request.body.remark;

    Profile.findOneAndUpdate(
        { _id: request.params.id },
        { $set: profileFields },
        { new: true }
    ).then(profile => response.json(profile))
})

// $route   POST api/profiles/delete/:id
// @desc    删除信息接口
// @access  Private
router.delete("/delete/:id",
    passport.authenticate('jwt', { session: false }),
    (request, response) => {
        Profile.findOneAndRemove({ _id: request.params.id })
            .then(profile => {
                response.json(profile)
            })
            .catch(err => response.status(404).json("删除失败!"))
    }
)
module.exports = router