const express = require('express');
const {check, validationResult, body} = require('express-validator');
const router = express.Router();
const helper = require('../config/helpers');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {database} = require('../config/helpers');
const dbCon = require('../config/static');

// job all ROUTE
router.post('/all-job',function(req,res,next) {
  const userID= req.body.userID;
    dbCon.query(`SELECT * FROM job_post INNER JOIN job_category ON job_post.job_category=job_category.job_category_id WHERE author =${userID}  ORDER BY job_post.job_post_id  DESC`,(error,result)=>{
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

// add-job ROUTE
router.post('/add-job', (req, res) => {

  console.log(req.body);
   
    let job_post_title = req.body.job_post_title;
    let job_post_content = req.body.job_post_content;
    let job_address = req.body.job_address;
    let author =req.body.author;
   
    helper.database.table('job_post').insert({
        job_post_title: job_post_title,
        job_post_content: job_post_content,
        job_address:job_address,
        author:author,
    }).then(lastId => {
        if (lastId > 0) {
            res.status(201).json({message: 'Job added successful.'});
        } else {
            res.status(501).json({message: 'Job add failed.'});
        }
    }).catch(err => res.status(433).json({error: err}));

});

/* GET View. */

router.post('/dataView',function(req,res,next) {
  const job_post_id= req.body.job_post_id;
  let sql = `SELECT * FROM job_post INNER JOIN job_category ON job_post.job_category=job_category.job_category_id WHERE job_post_id =${job_post_id} `;
  dbCon.query(sql,
  async(error,result)=>{
    if(error){
      res.send({'code':400,'data':error})
    }else{
      
        res.send({'code':200,'data':result})
        // res.status(201).json({message: 'Update successful.'});
        
      
    }
  })
  
})
/* GET Edit. */

router.post('/dataEdit',function(req,res,next) {
  // console.log(req.body);
    const job_post_id= req.body.job_post_id;
    const job_post_title = req.body.job_post_title;
    const job_post_content = req.body.job_post_content;
    const job_address = req.body.job_address;
    
    const updated_at= new Date().toISOString();
    let sql = `UPDATE job_post SET 
    job_post_title = '${job_post_title}' ,
    job_post_content = '${job_post_content}' ,
    job_address = '${job_address}' ,
    updated_at = '${updated_at}'
    WHERE job_post_id = '${job_post_id}'; `;
    dbCon.query(sql,
    async(error,result)=>{
      if(error){
        res.send({'code':400,'data':error})
      }else{
        
          // res.send({'code':200})
          res.status(201).json({message: 'Update successful.'});
        
      }
    })
  
})
/* GET  Delete. */

router.post('/dataDelete',function(req,res,next) {
  const job_post_id = req.body.job_post_id ;
 
  dbCon.query('DELETE FROM job_post WHERE job_post_id =?',[job_post_id],
  async(error,result)=>{
    if(error){
      res.send({'code':400,'data':error})
    }else{
      
        res.send({'code':200})
    }
  })
  
})







module.exports = router;