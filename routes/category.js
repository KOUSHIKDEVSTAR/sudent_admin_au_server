var express = require('express');
const { resource } = require('../app');
const app = require('../app');
const generateJwtToken = require('../config/jwt/genareteToken');
const  dbCon  = require('../config/static');
var router = express.Router();

/* GET Food Coupons. */
router.get('/all-category',function(req,res,next) {
    dbCon.query('SELECT * FROM categories  ORDER BY id DESC',(error,result)=>{
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

router.post('/addCategory', function(req, res, next) {
  // console.log(req.body);
  const title= req.body.title;
  
    dbCon.query("INSERT INTO categories (title) VALUES (?)",
      [title, description ,price,quantity,short_desc,image],(error,result)=>{
        if(error){
          res.send({'code':400,'data':error})
        }else{
          res.send({'code':200,'data':result})
        }
      });
  });

  /* GET data. */

  router.post('/categorydata',function(req,res,next) {
    const id= req.body.id;
    console.log(id);
    dbCon.query('SELECT * FROM categories WHERE id  = ?',[id],
    async(error,result)=>{
      if(error){
        res.send({'code':400,'data':error})
      }else{
        if(result.length >0){
          res.send({'code':200,'data':result})
        }else{
          res.send({'code':400})
        }
      }
    })
    
  })
  /* GET Edit. */
  
  router.post('/categoryEdit',function(req,res,next) {
    const id= req.body.id;
    const title= req.body.title;
    // const updated_at= new Date().toISOString();
    
    
  
    let sql = `UPDATE categories SET title = '${title}' WHERE id = '${id}'; `;
    dbCon.query(sql,
    async(error,result)=>{
      if(error){
        res.send({'code':400,'data':error})
      }else{
        
          res.send({'code':200})
        
      }
    })
    
  })
  /* GET  Delete. */
  
  router.post('/categorydelete',function(req,res,next) {
    const id= req.body.id;
    
    dbCon.query('DELETE FROM categories WHERE id=?',[id],
    async(error,result)=>{
      if(error){
        res.send({'code':400,'data':error})
      }else{
        
          res.send({'code':200})
      }
    })
    
  })


  module.exports = router;