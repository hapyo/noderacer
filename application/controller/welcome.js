/*!
 * noderacer Copyright(c) 2016 
 * MIT Licensed
 */
module.exports=node;
function node() {};
node.prototype.index=function(racer) {
       //racer.view.file("common/v_layout",{}); 
       //racer.view.out('true');
       racer.view.get("welcome", {"port":NODERACER.PORT,"msg":NODERACER.NAME+" "+NODERACER.VERSION});        
};

