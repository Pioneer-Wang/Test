const express = require('express')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')
const router = express.Router()
const Report = require('../../model/Report')

// 创建总结
router.post('/addReport',passport.authenticate('jwt', { session: false }),(req,res)=>{
    const newReport=new Report()
    newReport.username=req.body.username
    newReport.status=req.body.status
    newReport.reason=req.body.reason
    newReport.save()
        .then(data=>res.json({
            success:true,
            msg:'创建成功',
            data:data
        }))
        .catch(err=>res.json(err))
   
})
// 查询
router.get('/findAll',(req,res)=>{
    Report.find({})
        .then(data=>res.json({
            success:true,
            data:data
        }))
        .catch(err=>res.json(err))
})




module.exports=router