/*!
 * Noderacer Copyright(c) 2016 
 * MIT Licensed
 */

module.exports=node;
function node(r) {};
/* 
 * Global Scope, Racer Load Library
 * var step=racer.lib.step();
 * @type @call;require
 */

/*  common module list */
var modules={};
node.prototype.load=function(name){
    if(modules[name]){
        //console.log('create1');
        return modules[name];
    }
   // console.log('create2');
    modules[name]= require(name);
    return modules[name];
    //return gLibStep;            
};