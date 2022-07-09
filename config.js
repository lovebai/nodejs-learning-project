/*
 * @Descripttion: vue前端项目
 * @version: 1.0.0
 * @Author: Baishaodong
 * @Date: 2022-07-08 12:03:50
 * @LastEditors: Baishaodong
 * @LastEditTime: 2022-07-09 13:10:41
 * @BlogSite: https://www.xiaobaibk.com
 */

//数据库配置
const db_config = {
    host:'localhost', //连接地址
    user:'node', //数据库用户名
    password:'123456', //数据库密码
    database:'node' //数据库库名
}

const jwtSecretKey = 'hello key'


module.exports = {
    db_config,
    jwtSecretKey
}