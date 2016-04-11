module.exports = node;
function node() {
}

node.prototype.select = function (racer) {
    var whereData = {'id': '>=0'};
    var options = {
        table: "user",
        select: "id",
        limit: 1,
        where: {}
    };
    racer.db().select(options, function (err, r, q) {
        if (err) {
            console.log('err : ' + err);
        } else {            
            racer.view.out('query : ' + q+"<br>result : "+JSON.stringify(r));
        }
    });
    return R.WAIT;
};