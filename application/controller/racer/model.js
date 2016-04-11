module.exports = node;
function node() {
}

node.prototype.load = function (racer) {
    var method = racer.req.method;
    if (method == 'GET') {        
        var mBoard = racer.load.model("test/model");
        racer.view.out(mBoard.index());
    } else if (method == 'POST') {
    }    
};



