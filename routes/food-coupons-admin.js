var express = require('express');
const { resource } = require('../app');
const app = require('../app');
const generateJwtToken = require('../config/jwt/genareteToken');
const  dbCon  = require('../config/static');
var router = express.Router();

/* GET Food Coupons. */
router.get('/all-food-coupons',function(req,res,next) {
    dbCon.query('SELECT * FROM products  ORDER BY id DESC',(error,result)=>{
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

/* GET users addUser. */

router.post('/addFoodCoupons', function(req, res, next) {
  console.log(req.body);
  const title= req.body.title;
  const description  = req.body.description ;
  const price = req.body.price; 
  const quantity = req.body.quantity; 
  const short_desc = res.body.short_desc;
  const image  = req.body.image ;
    dbCon.query("INSERT INTO products (title,description ,price,quantity,short_desc,image) VALUES (?,?,?,?)",
      [title, description ,price,quantity,short_desc,image],(error,result)=>{
        if(error){
          res.send({'code':400,'data':error})
        }else{
          res.send({'code':200,'data':result})
        }
      });
  });




  module.exports = router;