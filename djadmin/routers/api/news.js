const express = require('express')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const router = express.Router()
const News = require('../../model/News')

// 新闻增加接口
router.post('/addNews',passport.authenticate('jwt', { session: false }),(req,res)=>{
    const newNews=new News({
        id:req.body.id,
        title:req.body.title,
        author:req.body.author,
        description:req.body.description,
        cate:req.body.cate,
        img_url:req.body.img_url
    })
    // console.log(newNews)
    newNews.save().then(news=>{
        res.json(news)
    })
})
// 新闻查找接口
router.get('/findAll',(req,res)=>{
    News.find({})
        .then(data=>res.json({
            success:true,
            data:data
        }))
        .catch(err=>res.json(err))
})
// 新闻编辑接口

// 新闻删除接口
router.post('/deleteNews',passport.authenticate('jwt', { session: false }),(req,res)=>[
    News.findOneAndDelete({_id:req.body.id})
        .then(data=>res.json({
            success:true,
            data:data
        }))
        .catch(err=>res.json(err))
])


module.exports=router