var express = require('express');
const { resource } = require('../app');
const app = require('../app');
const generateJwtToken = require('../config/jwt/genareteToken');
const  dbCon  = require('../config/static');
var router = express.Router();


// app.use(express.json());
/* POST users Register. */

router.post('/register', function(req, res, next) {
  const email= req.body.email;
  const password = req.body.password;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const mobile = req.body.mobile;
  const role = 3;
 
  dbCon.query('SELECT * FROM users WHERE email="'+email+'" ', (err, result) => {
    if (err) throw err;
    if (result.length>0){
      res.send("201");
    }
    else{
      
      dbCon.query(
        "INSERT INTO users (email,password,first_name,last_name,mobile,permissions) VALUES (?,?,?,?,?,?)",
        [email, password,first_name,last_name,mobile,role],
        (err,result)=>{
          console.log(err);
         
          var insertId =result.insertId;
          if(insertId != null){
            dbCon.query('INSERT INTO role_users (user_id,role_id)  VALUES(?,?)',
            [insertId,role])
            console.log(result.insertId);
            res.send('done');
          }
        })
    
    }
  });
  
});
router.post('/addStudent', function(req, res, next) {
  const email= req.body.email;
  const password = req.body.password;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const mobile = req.body.mobile;
  const role = 3;
  const address = req.body.address;
 
  dbCon.query('SELECT * FROM users WHERE email="'+email+'" ', (err, result) => {
    if (err) throw err;
    if (result.length>0){
      res.send("201");
    }
    else{
      
      dbCon.query(
        "INSERT INTO users (email,password,first_name,last_name,mobile,permissions) VALUES (?,?,?,?,?,?,?)",
        [email, password,first_name,last_name,mobile,role,address],
        (err,result)=>{
          console.log(err);
         
          var insertId =result.insertId;
          if(insertId != null){
            dbCon.query('INSERT INTO role_users (user_id,role_id)  VALUES(?,?)',
            [insertId,role])
            console.log(result.insertId);
            res.send('done');
          }
        })
    
    }
  });
  
});
/* POST users Login. */
router.post('/login', async function (req,res,next) {
  const email= req.body.email;
  const password = req.body.password;
  dbCon.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], 
  async(error, results)=> {
    if (error) {
      res.send(error);
    }else{
      if(results.length >0){
        dbCon.query('SELECT * FROM users WHERE email = ?', [email], 
          async(err, resul)=> {
            if (err) {
              res.send(err);
            }else{
              if(results.length >0){
                let token = await generateJwtToken({email});
                res.send({'code':200,'email':email,'id':resul[0].id, token});

              }
              else{
                res.send('400');
              }
            }
            })
        // let token = await generateJwtToken({email});
        // res.send({'code':200,'email':email, token});

      }
      else{
        res.send('400');
      }
    }
    })
})
/* GET users List. */
router.get('/all-users',function(req,res,next) {
  dbCon.query('SELECT * FROM users WHERE role = 555  ORDER BY id DESC',(error,result)=>{
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
/* POST users Data singel. */
router.post('/userdata',function(req,res,next) {
  const id= req.body.id;
  console.log(id);
  dbCon.query('SELECT * FROM users WHERE id = ?',[id],
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
/* POST users Update. */
router.post('/profileEdit',function(req,res,next) {
  const uId= req.body.id;
  const address= req.body.address;
  const first_name= req.body.first_name;
  const last_name= req.body.last_name;
  const mobile= req.body.mobile;
  const updated_at= new Date().toISOString();
 

  let sql = `UPDATE users SET address = '${address}',first_name='${first_name}',last_name='${last_name}',mobile='${mobile}',updated_at='${updated_at}' WHERE id = '${uId}'; `;
  dbCon.query(sql,
  async(error,result)=>{
    if(error){
      res.send({'code':400,'data':error})
    }else{
      
        res.send({'code':200})
      
    }
  })
  
})

module.exports = router;
