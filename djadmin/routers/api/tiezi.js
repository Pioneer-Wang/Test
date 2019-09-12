const express = require('express')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')
const router = express.Router()
const TieZi = require('../../model/Tiezi')

// 创建帖子
router.post('/addTieZi', (req, res) => {
    console.log("进来了...")
    const newTeizi = new TieZi({
        username: req.body.username,
        content: req.body.content,
        t_number: req.body.t_number

    })
    newTeizi.save().then(data => res.json({
        success: true,
        data: data
    })).catch(err => res.json(err))
})
// 查找所有帖子
router.get('/findAll', (req, res) => {
    TieZi
        .find({})
        .then(data => res.json({
            success: true,
            data: data
        }))
        .catch(err=>res.json(err))
})
// 单个删除
router.post('/deleteOne',passport.authenticate('jwt', { session: false }),(req,res)=>{
    // console.log(req.body._id)
    TieZi
    .findOneAndDelete({"_id":req.body._id})
    .then(data=>res.json({
        success:true,
        msg:'删除成功',
        data:data
    }))
    .catch(err=>console.log(err))

})
//批量删除





module.exports = router;