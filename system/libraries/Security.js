/* Copyright(C) 2014 NodeRacer Core */
/* Node Racer Construct Type */
module.exports=node;
function node() {    
};

node.prototype.index=function() {
    
}

node.prototype.encode=function(text) {
  try{
  if(typeof text!='string'){
      text=text.toString();      
  }
  var crypto=require('crypto');
  var app= require(GLOBAL.dcfg+"config");
  var m=new app();
  var cipher = crypto.createCipher(m.cfg['enc_method_default'],m.cfg['enc_key']);
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
  }
  catch(e){
      return false;
  }
}

node.prototype.decode=function(text) {
    try{
        var crypto=require('crypto');
        var app= require(GLOBAL.dcfg+"config");
         var m=new app(); 
         
        var decipher = crypto.createDecipher(m.cfg['enc_method_default'],m.cfg['enc_key'])
        var dec = decipher.update(text,'hex','utf8')
        dec += decipher.final('utf8');
        return dec;
    }
    catch(e){
        return false;
    }
}

node.prototype.getRandKey=function(){
    var crypto=require('crypto');    
    /*
    crypto.randomBytes(12, function(ex, buf) {
            var token = buf.toString('hex');
             //view.out(token);
             return token;
    });
    return token;*/
    
    return crypto.randomBytes(6).toString('hex');
    
    
    
    
}
 
 
 
 // not auth, later time, add encode function, by divide option
 node.prototype.md5=function(text){
    var crypto=require('crypto');
    var hash=crypto.createHash("md5").update(text).digest('hex');
 }