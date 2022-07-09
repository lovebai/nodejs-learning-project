/*
 * @Descripttion: vue前端项目
 * @version: 1.0.0
 * @Author: Baishaodong
 * @Date: 2022-07-09 10:59:21
 * @LastEditors: Baishaodong
 * @LastEditTime: 2022-07-09 11:26:05
 * @BlogSite: https://www.xiaobaibk.com
 */

//导入数据库操作模块
const db = require('../db/index')

//获取用户信息
const userInfoHandler = (req,res)=>{
        const sql = `select id,username,nickname,email,user_pic from nd_users where id = ?`
        // console.log(req.auth);
        db.query(sql,req.auth.id,(err,results)=>{
            if (err) {
                return res.cc(err,204)
            }
            if(results.length===0) return res.cc('查询失败',202)

            res.send({
                code:200,
                message:'数据查询成功',
                data: results[0]
            })
        })

}

//更新用户基本信息
const updateUserInfoHandler =(req,res)=> {
    res.cc('ok')
}

module.exports ={
    userInfoHandler,
    updateUserInfoHandler
}