var express = require('express');
var router = express.Router();
const  dbCon  = require('../config/static');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/all-users',function(req,res,next) {
  dbCon.query('SELECT * FROM users  ORDER BY id DESC',(error,result)=>{
    if(error){
      res.send(error);
    }else{
      res.send(
        {
          'code':200,
          'data':result
        }
        );
    }
  })
})
module.exports = router;
