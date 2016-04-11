module.exports = node;
/*
post get test 
 */
function node() {
}

node.prototype.index = function (racer) {    
       racer.view.get('/racer/v_getpost', {});
};

node.prototype.json = function (racer) {    
       console.log(racer.param.get());
       racer.view.out(racer.param.get());//get all values
};

node.prototype.specific = function (racer) {
       racer.view.out(racer.param.get('test'));//get test value
};

node.prototype.all = function (racer) {       
       racer.view.out(racer.param.get());//get test value
};

node.prototype.method = function (racer) {
       racer.view.out(racer.req.method);
};
node.prototype.is_get = function (racer) {
       racer.view.out(racer.param.is_get());
};
