const mysql = require('mysql');
const dbCon  = mysql.createConnection({
    user :'root',
    host : 'localhost',
    password : 'admin',
    database : 'mega_shop'
  })
  dbCon.connect( (error)=>{
    if(error){
      console.log(error)
    }else{
      console.log("MYSQL Connected....");
    }
   })


   module.exports = dbCon;
