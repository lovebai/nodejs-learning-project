/*
 * @Descripttion: 用户路由模块
 * @version: 1.0.0
 * @Author: Baishaodong
 * @Date: 2022-07-08 11:21:37
 * @LastEditors: Baishaodong
 * @LastEditTime: 2022-07-09 12:44:52
 * @BlogSite: https://www.xiaobaibk.com
 */

const { Router } = require("express");
const  router = Router()

//导入处理函数
const hander= require('../router_handler/user_handler')

// 导入验证数据中间件
// const expressJoi = require('express-joi')

// 导入需要验证的规则
const {user_validate} = require('../schema/user')

//注册新用户
router.post('/reguser',hander.regHandler)
// router.post('/reguser',expressJoi.joiValidate(user_validate),hander.regHandler)
// router.post('/reguser',expressJoi.joiValidate({body:{username:expressJoi.Joi.string().min(3).max(20).required()}}),hander.regHandler)


//登录
router.post('/login',hander.loginHandler)

module.exports = router