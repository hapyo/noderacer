/*!
 * Noderacer Copyright(c) 2016 
 * MIT Licensed
 */
module.exports = node;
function node() {};
node.prototype.index = function (racer) {
     return "index page";
};

node.prototype.writehead = function (racer) {
    racer.res.writeHead(200, {'Content-Type': 'text/html'});
    racer.res.end('OK');//Display
};

// Response = {"status":1}
node.prototype.true = function (racer) {    
    racer.view.out(R.TRUE);    
};

// Response = {"status":0}
node.prototype.false = function (racer) {
    racer.view.out(R.FALSE);    
};

// Resonse text
node.prototype.text = function (racer) {
    return "this is text";//Display
};

node.prototype.view = function (racer) {
    racer.view.get("welcome", {});
};

node.prototype.view2 = function (racer) {
    racer.view.file("welcome", {});
};


