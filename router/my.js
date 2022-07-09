const {Router} = require('express')
const { userInfoHandler,updateUserInfoHandler  } = require('../router_handler/my_handler')

const router =Router()

router.get('/userinfo',userInfoHandler)

router.post('/userinfo',updateUserInfoHandler)

module.exports = router