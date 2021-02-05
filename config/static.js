const mysql = require('mysql');
const dbCon  = mysql.createConnection({
  user :'sql12391021',
  host : 'sql12.freemysqlhosting.net',
  password : '2Z26HcPvmL',
  database : 'sql12391021',
  debug    :  true,
  wait_timeout : 28800,
  connect_timeout :10
  })
  dbCon.connect( (error)=>{
    if(error){
      console.log(error)
    }else{
      console.log("MYSQL Connected....");
    }
   })
   module.exports = dbCon;
