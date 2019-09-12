const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const mongonURL=require('./config/keys').mongonURL
const passport=require('passport')
const app=express()
// 连接数据库
mongoose.connect(mongonURL).then(data=>{
    console.log('数据库连接成功...')
}).catch(err=>{
    console.log(err)
})

// // 配置body-parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())




const user=require('./routers/api/user')
const news=require('./routers/api/news')
const tiezi=require('./routers/api/tiezi')
const talk=require('./routers/api/talk')
const sum=require('./routers/api/sum')
const report=require('./routers/api/report')
// 用户
app.use('/api/user',user)
// 帖子
app.use('/api/tiezi',tiezi)
// 民主评议
app.use('/api/talk',talk)
// 总结
app.use('/api/sum',sum)
// 汇报
app.use('/api/report',report)
// 新闻
app.use('/api/news',news)
// 写在最下方，引入一级路由前 不然出错
// // 配置passport，验证token
app.use(passport.initialize())  //初始化
require('./config/passport')(passport)  //导入配置文件，把passport传递过去


let port=3000

app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})

