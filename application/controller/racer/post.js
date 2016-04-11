module.exports = node;

function node() {
}

node.prototype.index = function (racer) {    
    return racer.view.get('/racer/v_getpost', {});
};


node.prototype.post_test = function (racer) {
    if (racer.param.is_get()) {
        console.log('get');
        racer.view.file("/racer/v_getpost", {});
    } else {
        racer.view.out('POST DATA : '+racer.param.post('n'));
    }
};

node.prototype.post = function (racer) {
    racer.view.out(racer.param.post());
};

/*
 racer/getpost/get_specific
 */
node.prototype.post_specific = function (racer) {
    racer.view.out(racer.param.post('test'));
};


node.prototype.is_post = function (racer) {
    racer.view.out(racer.param.is_post());
};

