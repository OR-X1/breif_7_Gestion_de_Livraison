const express = require('express');
// const cookieParser = require('cookie-parser')
const router = express.Router();
const { cookie } = require('express/lib/response');
const app = express();


// app.use(express.json())
// app.use(cookieParser())

// app.use(express.urlencoded({ extended : true }))


  router.get("/", (req, res) => {
    
    // res.clearCookie('token')
    // res.cookie('token', 'logout', { httpOnly: true })
    // const { cookies } = req
    // console.log(cookies.token);
    // console.log("hhhh");
    // res.redirect('/centrelogin')
    res.send({message:"logout"})

  });

module.exports = router;