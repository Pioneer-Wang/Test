const express = require('express')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')
const router = express.Router()
const Sum = require('../../model/Sum')

// 创建总结
router.post('/addSum',passport.authenticate('jwt', { session: false }),(req,res)=>{
    const newSum=new Sum()
    newSum.username=req.body.username
    newSum.status=req.body.status
    newSum.reason=req.body.reason
    newSum.save()
        .then(data=>res.json({
            success:true,
            msg:'创建成功',
            data:data
        }))
        .catch(err=>res.json(err))
   
})
// 查询
router.get('/findAll',(req,res)=>{
    Sum.find({})
        .then(data=>res.json({
            success:true,
            data:data
        }))
        .catch(err=>res.json(err))
})




module.exports=router