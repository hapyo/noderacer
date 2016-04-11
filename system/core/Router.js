/*!
 * Noderacer Copyright(c) 2016 
 * MIT Licensed
 */

module.exports = Router;

function Router(pUrl) {
}

function is_controller(postfix) {
    if (postfix.startsWith("/"))
    {
        postfix = postfix.substr(1);
    }
    var murl = GLOBAL.d + "/application/controller/" + postfix + ".js";
    try {
        return require.resolve(murl)
    } catch (e) {
        return false;
    }
}
;

//Racer String Prototype
String.prototype.startsWith = function (str) {
    return this.slice(0, str.length) == str;
};
String.prototype.endWith = function (suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};
//Prototype is apply to sub function, also.
function model(dir) {
    return require(GLOBAL.d + "/application/model/" + dir);
}
;
function controller(dir) {
    return require(GLOBAL.d + "/application/controller/" + dir);
}
;

/*
 *  Start Racer View Module 
 */
Router.prototype.racer = function (res, req) {
    try {
        var coreView = new (require(GLOBAL.DIR_SYSTEM + "core/View"))();
        var racer = coreView.view(res, req);
        
        var result = Router.prototype.route(racer);
        
        if (result == R.NOTFOUND) {
            racer.view.out('ERR : NOT FOUND PAGE');
        } else if (result == R.ERR) {
            racer.view.out('ERR : PAGE ERROR');
        } else {         
            
                if (result == R.TRUE || result == R.FALSE) {
                    racer.view.out(result);
                } else if (result != R.WAIT) {
                    racer.view.out(result);
                } else {
                    //wait
                }
            
        }
    } catch (err) {
    }
};

Router.prototype.route = function (racer) {
    try {
        var r;
        var path = racer.module.load('path');
        var v1 = (path).normalize(racer.req.url); // normalize the url which contain double slashes.

        v1 = v1.split("?")[0];  // delte get parameters
        if (v1.startsWith("/")) {
            v1 = v1.substr(1);
        }

        var urls = v1.split('\\');
        var len = v1.length;
        var i = 0;
        var turl = [];

        var lan_url = urls.length;



        for (; i < lan_url - 1; i++) {
            turl.push(urls[i]);
        }
        var front_url = turl.join('/');
        var last_f = urls[lan_url - 1];

        // Set Default Controller
        if (front_url.length == 0) {
            front_url = 'welcome';
        }

        // Image Routing Control
        if (last_f.endWith('.png') || last_f.endWith('.jpg') || last_f.endWith('.gif')) {
            if (!is_controller(front_url)) {
                var urls = front_url.split('/');
                if (is_controller(urls[0])) {
                    var myCtl = controller(urls[0]);
                    var obj = new myCtl();
                    if (r = obj[urls[1]](racer)) {
                        return r;

                    }
                }
            }
        }

        /*
         *  default controller
         */
        if (len == 0) {
            var tCtrl = controller("welcome");
            var obj = new tCtrl();
            if (r = obj['index'](racer)) {
                return r;
            }
        } else {
            /* Routing Only Controller Name
             * Example : /home
             */

            if (lan_url <= 2) {
                // Set Default Function
                last_f = 'index';

                try {
                    var tCtrl = new controller(front_url);
                    var obj = new tCtrl();

                    if (r = obj[last_f](racer)) {
                        //return true;
                        return r;
                    }
                } catch (e) {
                    try {

                        var tCtrl = new controller(front_url);
                        var obj = new tCtrl();
                        if (r = obj['index'](racer)) {
                            return r;
                        }

                    } catch (e) {
                        console.log('error_404');
                        racer.view.file("error/error_404", {});
                    }
                }
            }
            /*
             *  /name/name
             */
            else if (is_controller(front_url + '/' + last_f)) {


                var tCtrl = new controller(front_url + '/' + last_f);
                var obj = new tCtrl();
                try {


                    if (r = obj[last_f](racer)) {
                        // name/name/functionname
                        return r;
                    } else {
                        if (r = obj['index'](racer)) {
                            return r;
                        } else {
                            console.log('error_404');
                            racer.view.file("error/error_404", {});
                        }
                    }
                } catch (e) {
                    if (r = obj['index'](racer)) {
                        return r;
                    }
                }
            } else {
                if (is_controller(front_url)) {

                    try {
                        /*
                         *  /name/name/functionname
                         */
                        var tCtrl = new controller(front_url);
                        var obj = new tCtrl();

                        if (r = obj[last_f](racer)) {
                            return r;
                        }
                    } catch (e) {
                        console.log('error_404');
                        racer.view.file("error/error_404", {});
                    }
                } else {
                    console.log('error_404');
                    racer.view.file("error/error_404", {});
                }
            }
        }
        return false;
    } catch (err) {

        return false;
    }
};
