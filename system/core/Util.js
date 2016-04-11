/*!
 * Noderacer Copyright(c) 2016 
 * MIT Licensed
 */

module.exports=node;
function node() {
};

node.prototype.out=function(content){
  
}

node.prototype.dt=function(){
    var currentdate = new Date();
    return currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds() + ":"
            + currentdate.getMilliseconds();
}