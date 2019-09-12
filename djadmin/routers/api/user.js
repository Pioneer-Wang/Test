const express = require('express')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')
const router = express.Router()
const User = require('../../model/User')

// 注册接口
router.post('/register', (req, res) => {
    User.findOne({ phone: req.body.phone }).then(user => {
        if (user) {
            res.status(400).json('电话号已被注册!')
        } else {
            const newUser = new User({
                username: req.body.username,
                Uid: req.body.Uid,
                phone: req.body.phone,
                password: req.body.password,
                sort: req.body.sort,
                status: req.body.status
            })
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) console.log(err)
                    newUser.password = hash;
                    newUser.save().then(user => res.json(user)).catch(err => console.log(err))
                })

            })


        }
    }).catch(err => console.log(err))
})

// 登录接口
router.post("/login", (req, res) => {
    const phone = req.body.phone;
    const password = req.body.password;
    User.findOne({ phone }).then(user => {
        if (!user) {
            return res.status(404).json("用户不存在")
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // res.json({msg:"success"})
                const rule = {
                    id: user.id,
                    Uid: user.Uid,
                    username: user.username,
                    email: user.email,
                    status: user.status
                }
                jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                    if (err) console.log(err)
                    res.json({
                        success: true,
                        token: 'Bearer ' + token
                    })
                })
            } else {
                return res.status(404).json("密码错误")
            }
        })
    })
})



router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user._id,
        Uid: req.user.Uid,
        username: req.user.username,
        phone: req.user.phone
    })
})

// 密码修改接口
router.post('/updatePsd', passport.authenticate('jwt', { session: false }), (req, res) => {
    let phone = req.user.phone
    // console.log(phone)
    let password = req.body.password;
    // console.log(password)
    let rpassword = req.body.rpassword;
    // console.log(rpassword)
    User.findOne({ phone }).then(user => {
        if (!user) {
            res.status(404).json({
                success: false,
                msg: '用户不存在'
            })
        } else {
            if (password !== rpassword) {
                res.status(400).json({
                    success: false,
                    msg: '两次密码输入不同'
                })
            } else {
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) return res.json({ success: false })
                        password = hash;
                        User.update({ phone: phone }, { "password": password }, (err, doc) => {
                            if (err) console.log(err)
                            res.json({
                                success: true,
                                msg: '密码修改成功'
                            })

                        })

                    })

                })
            }



        }
    })

})

// 退出登录接口
router.get('/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
    let id = req.user.id;

    User.findOne({ _id: id }).then(user => {
        if (!user) {
            res.status(404).json({
                success: false,
                msg: "用户不存在"
            })
        } else {
            // 重新设置token值,将token的生理周期变成极短 1秒
            // let id = {}
            // jwt.sign(id, keys.secretOrKey, { expiresIn: 1 }, (err, token) => {
            //     if (err) console.log(err)
            //     res.json({
            //         success: true,
            //         token: 'Bearer ' + token
            //     })
            // })
            localStorage.removeItem(token)

        }
    })
})


// 添加用户列表接口
router.post('/addUser', (req, res) => {
    User.findOne({ phone: req.body.phone }).then(user => {
        if (user) {
            return res.status(400).json({
                success: false,
                msg: "用户已存在!"
            })
        } else {
            const newUser = new User({
                username: req.body.username,
                Uid: req.body.Uid,
                phone: req.body.phone,
                password:req.body.password,
                sort: req.body.sort,
                status: req.body.status
            })
            bcrypt.genSalt(10,function(err,salt){
                bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    if(err) return;
                    newUser.password=hash;
                    newUser.save().then(user=>res.json({
                        success:true,
                        msg:'用户添加错误',
                        user:user
                    })).catch(err=>res.status(400).json({
                        success:false,
                        msg:'用户添加错误'
                    }
                        
                    ))
                })
            })
           
        }
    })
})

// 用户查询接口
router.post('/findUser',(req,res)=>{
    // console.log(req.body.phone)
    User.findOne({phone:req.body.phone}).then(user=>{
        if(!user){
            res.status(400).json({
                success:false,
                msg:'用户不存在'
            })
        }else{
            res.status(200).json({
                success:true,
                user:user
            })
        }
    })
})
// 查询所有
router.get('/findAll',(req,res)=>{
    User.find().then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.json(err)
    })
})

// 修改用户接口
router.post('/updateUser',passport.authenticate('jwt', { session: false }),(req,res)=>{
    let phone=req.body.phone;
    const user={};
    user.username=req.body.username;
    user.Uid=req.body.Uid;
    user.sort=req.body.sort;
    // console.log(phone,username,Uid,sort)
    User.findOneAndUpdate({phone:phone},{$set:user},{new:true})
    .then(user=>res.json({
        success:true,
        user:user
    }))
    .catch(err=>console.log)
})










module.exports = router

