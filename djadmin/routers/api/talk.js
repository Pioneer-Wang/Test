const express = require('express')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')
const router = express.Router()
const Talk = require('../../model/Talk')

// 创建评议
router.post('/addTalk',passport.authenticate('jwt', { session: false }), (req, res) => {
    const newTalk = new Talk({
        description: req.body.description,
        status: req.body.status
    })
    newTalk.save().then(data => res.json({
        success: true,
        msg: '创建完成',
        data: data

    }))
})
// 查询所有接口
router.get('/findAll',(req,res)=>{
    Talk.find({}).then(data=>res.json({
        success:true,
        data:data
    }))
    .catch(err=>res.json(err))
})
// 修改接口
router.post('/updateTalk',passport.authenticate('jwt', { session: false }), (req,res)=>{
    const newTalk={};
    newTalk.description=req.body.description
    newTalk.status=req.body.status
    Talk.findOneAndUpdate({_id:req.body.id},{$set:newTalk},{new:true})
        .then(data=>res.json({
            success:true,
            data:data
        }))
        .catch(err=>res.json(err))
})

module.exports=router