var express = require('express');
const { resource } = require('../app');
const app = require('../app');
const generateJwtToken = require('../config/jwt/genareteToken');
const  dbCon  = require('../config/static');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Job Post. */
router.get('/all-job-post',function(req,res,next) {
    dbCon.query('SELECT * FROM job_post ORDER BY job_post_id DESC',(error,result)=>{
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

  router.post('/addJobPost', function(req, res, next) {
    console.log(req.body.job_category);
    const job_post_title= req.body.job_post_title;
    const author  = req.body.author ;
    const job_post_content = req.body.job_post_content;
    const job_address = req.body.job_address;
    const job_category = req.body.job_category;
    const job_post_slug = req.body.job_post_slug;
    const salary_details = req.body.salary_details;
    const salary_type = req.body.salary_type;
    const job_tag = req.body.job_tag;
    const job_type =req.body.job_type
 

      dbCon.query("INSERT INTO job_post (job_post_title,author ,job_post_content,job_address,job_category,job_post_slug,salary_details,salary_type,job_tag,job_type) VALUES (?,?,?,?,?,?,?,?,?,?)",
      [job_post_title,author,job_post_content,job_address,job_category,job_post_slug,salary_details,salary_type,job_tag,job_type],(error,result)=>{
          if(error){
          
            res.send({'code':400,'data':error})
          }else{
            res.send({'code':200,'data':result})
          }
        });
    });




  module.exports = router;
