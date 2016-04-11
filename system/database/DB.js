var db = null;
var myname='test';
module.exports = function(cb){     
    if(db){        
        cb(db);
        return;
    }    
    console.log("[DB] Status : Created, first");
    var currentdate = new Date();
            var dt=currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds() + ":"
            + currentdate.getMilliseconds();
    
    var Db = require('mysql-activerecord');   
    
    
    
    var ctl = require(GLOBAL.dcfg+"database.js");
    
 
    db=new Db.Adapter({
    server: ctl.db['hostname'],
    username:ctl.db['username'],
    password:ctl.db['password'],
    database:ctl.db['database']
    });
    cb(db);
};