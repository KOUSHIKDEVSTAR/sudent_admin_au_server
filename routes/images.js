const express = require('express');
const router = express.Router();
const {database} = require('../config/helpers');
const { upload } = require('../config/multer/multer');
const  dbCon  = require('../config/static');

//-------------------------------------------------------------
//  PRODUCT IMAGE UPLOAD API
//-------------------------------------------------------------
router.post('/uploadProductImage/:para/:id', async function(req, res, next) {
    try {
  
        const ID = req.params.id;
        const PARA = req.params.para;
        console.log('ID value    : ', ID);
        console.log('PARA value    : ', PARA);
  
        upload(req, res, (err) => {
          if (err) {
            // RESPONCE.errorResponce(res, 'Image Not Uploaded');
            res.send({'code':400,'message':'Image Not Uploaded'});
          } else {
  
            if(req.file == undefined){
                res.send({'code':401,'message':'Image Not Uploaded'});
            }else{
                if(PARA=='vendor'){
                    // console.log('req.files       ', req.file);
                    const updated_at= new Date().toISOString();
                    let sql = `UPDATE users SET 
                    photoUrl = '${req.file.filename}' ,
                    updated_at = '${updated_at}'
                    WHERE id = '${ID}'; `;
                    dbCon.query(sql,
                        async(error,result)=>{
                        if(error){
                            res.send({'code':400,'data':error})
                        }else{
                            
                            // res.send({'code':200})
                            res.status(201).json({message: 'Update successful.'});
                            
                        }
                    })
                }else if(PARA=='profife'){
                    // console.log('req.files       ', req.file);
                    const updated_at= new Date().toISOString();
                    let sql = `UPDATE users SET 
                    photoUrl = '${req.file.filename}' ,
                    updated_at = '${updated_at}'
                    WHERE id = '${ID}'; `;
                    dbCon.query(sql,
                        async(error,result)=>{
                        if(error){
                            res.send({'code':400,'data':error})
                        }else{
                            
                            // res.send({'code':200})
                            res.status(201).json({message: 'Update successful.'});
                            
                        }
                    })
                }else if(PARA=='profileID'){
                    console.log('req.files       ', req.file);
                    const updated_at= new Date().toISOString();
                    let sql = `UPDATE users SET 
                    student_id_img = '${req.file.filename}' 
                   
                    WHERE id = '${ID}'; `;
                    dbCon.query(sql,
                        async(error,result)=>{
                        if(error){
                            console.log(error);
                            res.send({'code':400,'data':error})
                        }else{
                            console.log(result);
                            // res.send({'code':200})
                           
                            res.status(201).json({message: 'Registration successful.'});
                            
                        }
                    })
                }
              

            }           
          }
        });
        
    } catch (error) {
    
        // error response
        
    }
  });




module.exports = router;