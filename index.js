/*
 * @Descripttion: vue前端项目
 * @version: 1.0.0
 * @Author: Baishaodong
 * @Date: 2022-07-08 11:13:12
 * @LastEditors: Baishaodong
 * @LastEditTime: 2022-07-09 12:43:20
 * @BlogSite: https://www.xiaobaibk.com
 */
//导入express
const express = require('express')

//导入cors
const cors = require('cors')

//导入路由
const userRouter = require('./router/user')
const userInfoRouter = require('./router/my')

//导入验证token包
const {expressjwt:jwt} =require('express-jwt')

//导入全局配置
const {jwtSecretKey} = require('./config')


//验证
// const expressJoi = require('express-joi')

//创建服务器实例对象
const app = express()

//服务器端口
const port = 8080

//注册全局中间件
//cors
app.use(cors())

//配置解析表单数据的中间件,只能解析application/x-www-form-urlencoded格式的表单数据
app.use(express.urlencoded({extended:false}))
app.use(express.json())



//封装Res.cc
app.use((req,res,next)=>{
    res.cc = (err,code=200)=>{
        // console.log('Start Error...');
        res.send({
            code,
            message:err instanceof Error ? err.message:err
        })
    }
    next()
})

//验证token
app.use(jwt({secret:jwtSecretKey,algorithms:['HS256']}).unless({path:[/^\/api/]}))

//注册路由
app.use('/api',userRouter) //用户登录注册
app.use('/my',userInfoRouter) //用户信息

//定义错误级别的中间件
app.use((err,req,res,next)=>{
    // if (err instanceof  expressJoi.ValidationError) {
    //     res.cc(err.message,208)
    // }
    if (err.name === 'UnauthorizedError') {
        return res.cc('teken验证失败')
    }
    res.cc(err)
})


//启动服务器
app.listen(port,()=>{
    console.log(`api server runing at http://127.0.0.1:${port}`);

})