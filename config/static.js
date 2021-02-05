const mysql = require('mysql');
const dbCon  = mysql.createConnection({
    user :'uvkl3iwgrwdk5caf',
    host : 'bpuoui6y5mdihzhpfuav-mysql.services.clever-cloud.com',
    password : 'kjKh1ymarGlEmLVWHSxp',
    database : 'bpuoui6y5mdihzhpfuav'
  })
  dbCon.connect( (error)=>{
    if(error){
      console.log(error)
    }else{
      console.log("MYSQL Connected....");
    }
   })
   module.exports = dbCon;
