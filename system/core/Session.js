/*!
 * Noderacer Copyright(c) 2016 
 * MIT Licensed
 */

module.exports=node;
function node() {};

//this class set
//http://expressjs.com/migrating-4.html
//https://github.com/expressjs/session?_ga=1.41890981.60947691.1405990438
node.prototype.session=function(pReq) {
    var m_req = pReq;
    return {
        destroy: function() {
            m_req.session = null;
            return true;
        },
        set: function(key, value) {
            m_req.session[key] = value;
        },
        get: function(key) {
            if (m_req.session[key] === 'undefined') {
                return '';
            } else {
                return m_req.session[key];
            }
        },
        blankLogin: function() {
            m_req.session.isLogin=true,
            m_req.session.user_id = 'admin';
            m_req.session.user_n = '1';
            m_req.session.user_basic_alias = 'imadmin';
            m_req.session.user_basic_name = 'jeongjinwook';
            m_req.session.user_grade = 'silver';
        }
    }
}




