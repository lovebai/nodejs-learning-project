/*
 * @Descripttion: vue前端项目
 * @version: 1.0.0
 * @Author: Baishaodong
 * @Date: 2022-07-08 12:05:51
 * @LastEditors: Baishaodong
 * @LastEditTime: 2022-07-08 12:08:02
 * @BlogSite: https://www.xiaobaibk.com
 */
//导入MySQL
const mysql = require('mysql')
//导入数据库配置文件
const {db_config} = require('../config')

//创建数据库连接
const db = mysql.createPool(db_config)

//向外共享数据库连接对象
module.exports = db