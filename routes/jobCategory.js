var express = require('express');
const { resource } = require('../app');
const app = require('../app');
const generateJwtToken = require('../config/jwt/genareteToken');
const  dbCon  = require('../config/static');
var router = express.Router();

/* GET Food Coupons. */
router.get('/all-job-category',function(req,res,next) {
    dbCon.query('SELECT * FROM job_category  ORDER BY job_category_id DESC',(error,result)=>{
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
  // console.log(req.body);
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

  /* GET data. */

router.post('/job-categorydata',function(req,res,next) {
  const id= req.body.id;
  console.log(id);
  dbCon.query('SELECT * FROM job_category WHERE job_category_id  = ?',[id],
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

router.post('/job-categoryEdit',function(req,res,next) {
  const job_category_id= req.body.job_category_id;
  const job_category_title= req.body.job_category_title;
  // const updated_at= new Date().toISOString();
  
  

  let sql = `UPDATE job_category SET job_category_title = '${job_category_title}' WHERE job_category_id = '${job_category_id}'; `;
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

router.post('/jobcategorydelete',function(req,res,next) {
  const id= req.body.id;
  console.log(id);
  dbCon.query('DELETE FROM job_category WHERE job_category_id=?',[id],
  async(error,result)=>{
    if(error){
      res.send({'code':400,'data':error})
    }else{
      
        res.send({'code':200})
    }
  })
  
})


  module.exports = router;