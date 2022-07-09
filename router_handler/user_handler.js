/*
 * @Descripttion: vue前端项目
 * @version: 1.0.0
 * @Author: Baishaodong
 * @Date: 2022-07-08 11:30:41
 * @LastEditors: Baishaodong
 * @LastEditTime: 2022-07-09 09:17:37
 * @BlogSite: https://www.xiaobaibk.com
 */
//用户处理函数模块

//导入数据库操作模块
const db = require('../db/index')

//加密模块bcryptjs
const bcryptjs = require('bcryptjs')

// const expressJoi = require('express-joi')

//导入配置
const {jwtSecretKey} =require('../config')

//导入jsonwebtoken包
const jwt = require('jsonwebtoken')



//处理用户注册
const regHandler = (req,res)=>{
    //获取客户端提交数据
    const userinfo = req.body
    // console.log(userinfo);
    //对表单中的数据进行合法性校验
    if(!userinfo.username||!userinfo.password){
    //     // return res.send({
    //     //     'code':203,
    //     //     'massage':'用户名或密码不合法'
    //     // })
        return res.cc('用户名或密码不合法',203)
    }
    // console.log(userinfo);

    //检测用户是否已存在
    const sql = 'select * from nd_users where username = ?'

    db.query(sql,userinfo.username,(err,results)=>{

        //执行sql语句失败
        // if(err) return res.send({
        //     'code':204,
        //     'massage':err.massage
        // })
        console.log(userinfo.username);
        if(err) return res.cc(err,204)

        //判断用户名是否被占用
        if(results.length>0){
        //     return res.send({
        //     'code':202,
        //     'massage':'用户名被占用，请更换'
        // })
        return res.cc('用户名被占用，请更换!',202)
        }

        //TODO：用户名可用
        // console.log(userinfo.password);
        //使用bcrypt.hashSync()对密码进行加密
        userinfo.password = bcryptjs.hashSync(userinfo.password,10)
        // console.log(userinfo.password);

        const insert = 'insert into nd_users set ?'

        db.query(insert,{'username':userinfo.username,'password':userinfo.password},(err,results)=>{
            //判断失去了语句是否执行成功
            if (err) {
                // return res.send({
                //     'code':204,
                //     'massage':err.massage
                // })
                return res.cc(err,204)
            }
            //判断影响行数是否为1
            console.log(results.affectedRows);
            if(results.affectedRows!==1){
                // return res.send({
                //     'code':201,
                //     'massage':'注册用户失败请稍后再试！'
                // })
                return res.cc('注册用户失败请稍后再试！',201)
            }
            //注册成功
            // res.send({
            //     'code':200,
            //     'massage':'恭喜您，注册成功啦！'
            // })
            res.cc('恭喜您，注册成功啦！')
        })


    })

}

//处理用户登录
const loginHandler = (req,res)=>{
    const userinfo = req.body
    // console.log(userinfo);
    //对表单中的数据进行合法性校验
    if(!userinfo.username||!userinfo.password){
        return res.cc('用户名或密码不合法',203)
    }
    const sql = 'select * from nd_users where username = ?'
    db.query(sql,userinfo.username,(err,results)=>{
        if(err) return res.cc(err,203)

        if (results.length===0) {
            return res.cc('该用户不存在，请先注册',204)
        }
        //加密
        // userinfo.password = bcryptjs.hashSync(userinfo.password,10)
        // console.log(results[0].password);
        if (!bcryptjs.compareSync(userinfo.password,results[0].password)) {
             return res.cc('用户密码错误',209)
        }
        // res.cc('登录成功')
        
        //TODO: 服务端生成token

        const user = {
            ...results[0],
            password: '',
            user_pic: ''
        }

        const tonken = jwt.sign(user,jwtSecretKey,{
            //tonken有效期
            expiresIn: '10h',
            algorithm: "HS256"
        })

        //响应给客户端
    res.send({
        'code':200,
        'message':'恭喜您，登录成功啦',
        'token': 'Bearer '+tonken
    })
        


        //用户存在情况，校验密码
        // const sqlStr = 'select * from nd_users where username = ? and password = ?'
        
        // db.query(sqlStr,[userinfo.username,userinfo.password],(err,rest)=>{
        //     if(err) return res.cc(err,203)
        //     console.log(rest.length);
        //     if (rest.length===0) {
        //         return res.cc('用户密码错误',209)
                
        //     }
        //     return res.cc('登录成功')
        // })


    })


}

module.exports = {
    regHandler,
    loginHandler
}