const express = require('express');
const {check, validationResult, body} = require('express-validator');
const router = express.Router();
const helper = require('../config/helpers');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {database} = require('../config/helpers');
const  dbCon  = require('../config/static');

// // LOGIN ROUTE
router.post('/login', [helper.hasAuthFields, helper.isPasswordAndUserMatch], (req, res) => {
    let token = jwt.sign({state: 'true', email: req.body.email, username: req.body.username}, helper.secret, {
        algorithm: 'HS512',
        expiresIn: '4h'
    });
    database.table('users').filter({email: req.body.email})
        .withFields([ 'username' , 'email','fname', 'lname', 'phone', 'role', 'id' ])
        .get().then(user => {
           
        if (user) {
            // res.json({user});
            res.json({token: token, auth: true, email: req.body.email, username: req.body.username,role:user.role});
        } else {
            res.json({message: `NO USER FOUND WITH ID : ${email}`});
        }
    }).catch(err => res.json(err) );
    // res.json({token: token, auth: true, email: req.body.email, username: req.body.username});
});



// REGISTER ROUTE USER
router.post('/register', [
    check('email').isEmail().not().isEmpty().withMessage('Field can\'t be empty')
        .normalizeEmail({all_lowercase: true}),
    check('password').escape().trim().not().isEmpty().withMessage('Field can\'t be empty')
        .isLength({min: 6}).withMessage("must be 6 characters long"),
    body('email').custom(value => {
        return helper.database.table('users').filter({
            $or:
                [
                    {email: value}, {username: value.split("@")[0]}
                ]
        }).get().then(user => {
            if (user) {
                console.log(user);
                return Promise.reject('Email / Username already exists, choose another one.');
            }
        })
    })
], async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    } else {
            console.log(req.body);
        let email = req.body.email;
        let username = email.split("@")[0];
        let password = await bcrypt.hash(req.body.password, 10);
        let fname = req.body.fname;
        let lname = req.body.lname;
        let role = req.body.role;
        let phone = req.body.phone;
        let gender = req.body.gender;
        let dob = req.body.dob;
        let field_of_study = req.body.field_of_study;
        let university_name = req.body.university_name;
        let student_id = req.body.student_id;
        let student_exp_date = req.body.student_exp_date;
        let course_name = req.body.course_name;
        let student_origin_country = req.body.student_origin_country;
        let student_visa_type = req.body.student_visa_type;
        let student_city_live = req.body.student_city_live;
        let address = req.body.address;
        let state = req.body.state;
        let suburb = req.body.suburb;
        let postcode = req.body.postcode;
       
        helper.database.table('users').insert({
            username: username,
            password: password,
            email: email,
            role: role,
            phone:phone,
            lname: lname ,
            fname: fname ,
            gender: gender,
            dob: dob ,
            address: address ,
            state: state ,
            suburb: suburb ,
            postcode: postcode ,
            field_of_study: field_of_study ,
            university_name: university_name,
            student_id: student_id ,
            student_exp_date: student_exp_date ,
            course_name: course_name ,
            student_origin_country:student_origin_country,
            student_visa_type:student_visa_type,
            student_city_live:student_city_live,
        }).then(lastId => {
            console.log(lastId);
            if (lastId > 0) {
                
                res.status(201).json({message: 'Student Registration successful.', id: lastId});
            } else {
                res.status(501).json({message: 'Registration failed.'});
            }
        }).catch(err => res.status(433).json({error: err}));
        
    }
});
// REGISTER ROUTE VENDOR
router.post('/register-vendor', [
    check('email').isEmail().not().isEmpty().withMessage('Field can\'t be empty')
        .normalizeEmail({all_lowercase: true}),
    check('password').escape().trim().not().isEmpty().withMessage('Field can\'t be empty')
        .isLength({min: 6}).withMessage("must be 6 characters long"),
    body('email').custom(value => {
        return helper.database.table('users').filter({
            $or:
                [
                    {email: value}, {username: value.split("@")[0]}
                ]
        }).get().then(user => {
            if (user) {
                console.log(user);
                return Promise.reject('Email / Username already exists, choose another one.');
            }
        })
    })
], async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    } else {

        let email = req.body.email;
        let username = email.split("@")[0];
        let password = await bcrypt.hash(req.body.password, 10);
        let fname = req.body.fname;
        let lname = req.body.lname;
        let role = req.body.role;

        let company_name = req.body.company_name;
        let company_address = req.body.company_address;
        let company_about = req.body.company_about;
        
        helper.database.table('users').insert({
            username: username,
            password: password,
            email: email,
            role: role,
            lname: lname || null,
            fname: fname || null,
            company_name: company_name,
            company_address: company_address,
            company_about: company_about,
        }).then(lastId => {
            if (lastId > 0) {
                res.status(201).json({message: 'Vendor Registration successful.'});
            } else {
                res.status(501).json({message: 'Registration failed.'});
            }
        }).catch(err => res.status(433).json({error: err}));
        
    }
});
/* GET View. */

router.post('/dataView',function(req,res,next) {
    const id= req.body.id;
    let sql = `SELECT * FROM users  WHERE id =${id} `;
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
  router.post('/emaildata',function(req,res,next) {
    const email= req.body.email;
    let sql = `SELECT * FROM users  WHERE email =${email} `;
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
    console.log(req.body);
      const id= req.body.id;
      const fname = req.body.fname;
      const lname = req.body.lname;
      const email = req.body.email;
      const gender = req.body.gender;
      const dob = req.body.dob;
      const field_of_study = req.body.field_of_study;
      const university_name = req.body.university_name;
      const student_id = req.body.student_id;
      const student_exp_date = req.body.student_exp_date;
      const course_name = req.body.course_name;
      
      const updated_at= new Date().toISOString();
      let sql = `UPDATE users SET 
      fname = '${fname}' ,
      lname = '${lname}' ,
      email = '${email}' ,
      gender = '${gender}' ,
      dob = '${dob}' ,
      field_of_study = '${field_of_study}' ,
      university_name = '${university_name}' ,
      student_id = '${student_id}' ,
      student_exp_date = '${student_exp_date}' ,
      course_name = '${course_name}' ,
      updated_at = '${updated_at}'
      WHERE id = '${id}'; `;
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

module.exports = router;
