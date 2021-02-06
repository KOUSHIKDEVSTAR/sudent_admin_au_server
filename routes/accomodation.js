const express = require('express');
const {check, validationResult, body} = require('express-validator');
const router = express.Router();
const helper = require('../config/helpers');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {database} = require('../config/helpers');
const dbCon = require('../config/static');

// accomodation all ROUTE
router.post('/all-accomodation',function(req,res,next) {
  // console.log(req.body);
  const userID= req.body.userID;
  // console.log(userID);
    dbCon.query(`SELECT * FROM accomodation_post INNER JOIN accomodation_type ON accomodation_post.accomodation_type=accomodation_type.accomodation_type_id   WHERE author =${userID} ORDER BY accomodation_post.accomodation_id   DESC`,(error,result)=>{
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

// add-accomodation ROUTE
router.post('/add-accomodation', (req, res) => {

  
   
    let title = req.body.title;
    let post_content = req.body.post_content;
    let accomodation_price = req.body.accomodation_price;
    let post_short_content = req.body.post_short_content;
    let address = req.body.address;
    let accomodation_type = req.body.accomodation_type;
    let bedroom = req.body.bedroom;
    let bathroom = req.body.bathroom;
    let parking_area = req.body.parking_area;
    let floor_area =req.body.floor_area;
    helper.database.table('accomodation_post').insert({
        title: title,
        post_content: post_content,
        accomodation_price: accomodation_price,
        post_short_content:post_short_content,
        address:address,
        accomodation_type:accomodation_type,
        bedroom:bedroom,
        bathroom:bathroom,
        parking_area:parking_area,
        floor_area:floor_area,
    }).then(lastId => {
        if (lastId > 0) {
            res.status(201).json({message: 'Accomodation added successful.'});
        } else {
            res.status(501).json({message: 'Accomodation add failed.'});
        }
    }).catch(err => res.status(433).json({error: err}));

});

/* GET View. */

router.post('/accomodationView',function(req,res,next) {
  const accomodation_id= req.body.accomodation_id;
  let sql = `SELECT * FROM accomodation_post INNER JOIN accomodation_type ON accomodation_post.accomodation_type=accomodation_type.accomodation_type_id  WHERE accomodation_id= ${accomodation_id} `;
  dbCon.query(sql,
  async(error,result)=>{
    if(error){
      res.send({'code':400,'data':error})
    }else{
      
        res.send({'code':200,'data':result})
        
      
    }
  })
  
})

/* GET Edit. */

router.post('/accomodationEdit',function(req,res,next) {
  // console.log(req.body);
    const accomodation_id= req.body.accomodation_id;
    const title = req.body.title;
    const post_content = req.body.post_content;
    const accomodation_price = req.body.accomodation_price;
    const post_short_content = req.body.post_short_content;
    const address = req.body.address;
    const accomodation_type = req.body.accomodation_type;
    const bedroom = req.body.bedroom;
    const bathroom = req.body.bathroom;
    const parking_area = req.body.parking_area;
    const floor_area =req.body.floor_area;
    const updated_at= new Date().toISOString();
  let sql = `UPDATE accomodation_post SET 
  title = '${title}' ,
  post_content = '${post_content}' ,
  accomodation_price = '${accomodation_price}' ,
  post_short_content = '${post_short_content}' ,
  address = '${address}' ,
  accomodation_type = '${accomodation_type}' ,
  bedroom = '${bedroom}' ,
  bathroom = '${bathroom}' ,
  parking_area = '${parking_area}' ,
  floor_area = '${floor_area}' ,
  updated_at = '${updated_at}'
  WHERE accomodation_id = '${accomodation_id}'; `;
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

router.post('/accomodationdelete',function(req,res,next) {
  const accomodation_id = req.body.accomodation_id ;
  // console.log(accomodation_id);
  dbCon.query('DELETE FROM accomodation_post WHERE accomodation_id =?',[accomodation_id],
  async(error,result)=>{
    if(error){
      res.send({'code':400,'data':error})
    }else{
      
        res.send({'code':200})
    }
  })
  
})

module.exports = router;