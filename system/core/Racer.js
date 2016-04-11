/*!
 * Noderacer Copyright(c) 2016 
 * MIT Licensed
 */
function main() {  
    
};

main.prototype.model=function(dir) {   
       console.log('TEST!!');
    //return require(GLOBAL.d + "/application/model/" + dir);
}


main.prototype.controller=function(racerModel) {    
    
}

main.prototype.db=function() {             
    return require(GLOBAL.DIR_SYSTEM+"database/DB.js");
}


main.prototype.views=function(ret){
        express.res.setHeader('Content-Type','text/html');  
        express.res.send(ret);
        express.res.end();
}


module.exports=main;