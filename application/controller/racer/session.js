module.exports = node;
function node() {}
;

node.prototype.set = function(racer) {
    racer.req.session.myname='hello';   
    return racer.req.session.myname;
};
node.prototype.get = function(racer) {
    return racer.req.session.myname;    
};


