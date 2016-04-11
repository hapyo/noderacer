/*!
 * Noderacer Copyright(c) 2016 
 * MIT Licensed
 */

module.exports = node;
function node() {
}

var lib = {};
var model = {};
//Load Common Functions
function load() {    
    return {
        db: function () {
            if (lib['db']) {
                return lib['db'];
            } else {
                lib['db'] = require(GLOBAL.DIR_SYSTEM + "database/DB");
                return lib['db']
            }
        },
        model: function (racerModel) {
            if (!racerModel.endWith('js')) {
                racerModel += ".js";
            }
            var mModel = require(GLOBAL.dm + racerModel);
            return new mModel();
        },
        lib: function (racerModel) {
            if (!racerModel.endWith('js')) {
                racerModel += ".js";
            }
            var mModel = require(GLOBAL.DIR_SYSTEM + "libraries/" + racerModel);
            return new mModel();
        }
    }
}

node.prototype.view = function (pRes, pReq) {
    var m_req = pReq;
    var m_res = pRes;


    var m_session = (new (GLOBAL.loads.core("Session"))()).session(m_req);
    var m_modules = (new (GLOBAL.loads.core("Modules"))());

    var currentdate = new Date();
    var dt = currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds() + ":"
            + currentdate.getMilliseconds();

    m_session.set('time', dt);
    m_session.blankLogin();

    var sanitizer = m_modules.load('sanitize-html');//https://www.npmjs.org/package/sanitize-html
    var _ = m_modules.load('underscore');//http://underscorejs.org/
    if (m_req.body) {
        _.each(m_req.body, function (value, key) {
            if (key != "textarea" && !parseInt(value, 10) && value !== null) {
                if (typeof value === 'string') {
                    value = value.replace(/&gt;/gi, '>');
                    value = value.replace(/&lt;/gi, '<');
                    value = value.replace(/(&copy;|&quot;|&amp;)/gi, '');
                }
                m_req.body[key] = sanitizer(value, {
                    allowedTags: []
                });
            }
        });
    }

    function fileStr(fn, jsondata) {
        var ejs = m_modules.load('ejs'), fs = m_modules.load('fs');
        var fn = (!fn.endWith(".ejs")) ? fn + ".ejs" : fn;
        fn = GLOBAL.dv + fn;
        fn = (require('path')).normalize(fn); // normalize the url which contain double slashes.        
        var mfile = fs.readFileSync(fn, 'utf-8');
        return ejs.render(mfile, jsondata);
    }

    var file = {
        get: function (fn, jsondata) { //fileString
            return fileStr(fn, jsondata);
        }
    };

    function response(status, type, str) {
        m_res.writeHead(status, {'Content-Type': type});
        m_res.end(str);
    }


    var view_module = {
        out: function (content, caller) {

            var m_type = (typeof content);


            if (m_type === 'object') {
                response(200, "json", JSON.stringify(content));
            } else if (m_type === 'string') {
                if (content) {
                    response(200, 'text/html', content);
                }
            } else if (m_type === 'boolean' || m_type === 'number') {
                response(200, 'json', JSON.stringify({status: Number(content)}));
            } else {
                console.log('error');
                response(403, 'text/html', String(content));
            }
        }
    };


    var view = {
        response: function (status, type, str) {
            response(status, type, str);
        },
        template: {
            out: function (options, pList) {
                var t_tmp = {};
                for (var ke in pList) {
                    if (pList.hasOwnProperty(ke)) {
                        t_tmp[ke] = fileStr(pList[ke], {});
                    }
                }
                view_module.out(fileStr(options.layout, t_tmp), 'out');
            },
            header_aside_article: function (options) {
                var aside = fileStr(options.aside, {});
                var header = fileStr(options.header, {});
                var article = fileStr(options.article, options.article_json);
                view_module.out(fileStr(options.layout, {"header": header, "aside": aside, "article": article}), 'header_aside_article');
            },
            header_article_article: function (options) {
                var header = fileStr(options.header, {});
                var article = fileStr(options.article, options.article_json);
                view_module.out(fileStr(options.layout, {"header": header, "article": article}), 'header_article_article');
            },
            options: function (options) {
                var m_layout = '';
                if (options.hasOwnProperty('layout')) {
                    m_layout = options.layout.url;
                    delete options['layout'];
                } else {
                    console.log('layout property was not found');
                }
                var m_result = {};
                for (k in options) {
                    try {
                        if (options[k].hasOwnProperty('json')) {
                            m_result[k] = fileStr(options[k].url, options[k].json);
                        } else {

                            m_result[k] = fileStr(options[k].url, {});
                        }
                    } catch (e) {
                        console.log('options view error : ' + e);
                    }
                }

                view_module.out(fileStr(m_layout, m_result), 'options');
            }
        },
        file: function (fn, jsondata) {
            view_module.out(fileStr(fn, jsondata), 'file');
        },
        get: function (fn, jsondata) {
            view_module.out(fileStr(fn, jsondata), 'get');
        },
        out: function (content) {
            view_module.out(content, 'out 2');
        }
    };

    var param = {
        get: function (p) {
            if (!module_url) {
                module_url = require('url');
            }
            var url_parts = module_url.parse(m_req.url, true);
            if (p) {
                return url_parts.query[p];
            } else {
                return url_parts.query;
            }
        },
        post: function (p) {
            if (m_req.method != 'POST') {
                return '';
            }
            if (!p) {
                return m_req.body;
            } else {
                return m_req.body[p];
            }
            return "";
        },
        is_post: function () {
            return (m_req.method == 'POST') ? 1 : 0;
        },
        is_get: function () {
            return (m_req.method == 'GET') ? 1 : 0;
        }
    }

    //resolve prototypes
    return {
        param: param,
        module: m_modules,
        session: m_session,
        req: m_req,
        res: m_res,
        view: view,
        file: file,
        load: load(),
        db: db(pRes),
        security: GLOBAL.Security,
        name: GLOBAL.g_names,
        auth: GLOBAL.g_auth,
        util: GLOBAL.g_util,
        redis: GLOBAL.redis
    }
}

var module_url = null;


function db(pRes) {
    return  function (tablename) {
        return{
            update: function (options, cb) {
                load().db()(
                        function (pdb) {
                            if (!options['table']) {
                                cb(true, 'Please enter the name of the table.');
                            }
                            if (!options['data']) {
                                cb(true, 'Please enter the data.');
                            }
                            if (!options['where']) {
                                cb(true, 'Please enter the where data.');
                            }

                            pdb
                                    .where(options['where'])
                                    .update(options['table'], options['data'], function (err, results, fields) {
                                        if (options['query']) {
                                            console.log(pdb._last_query());
                                        }
                                        if (cb) {
                                            cb(err, results);
                                        } else {
                                            if (pRes) {
                                                pRes.end(JSON.stringify(results));
                                            }
                                        }
                                    });
                        }
                );
            },
            last_query: function () {
                load().db()(
                        function (pdb) {
                            console.log(pdb._last_query());
                        });
            },
            insert: function (options, cb) {
                load().db()(
                        function (pdb) {
                            if (!options['table']) {
                                cb(true, 'Please enter the name of the table.');
                            }
                            if (!options['data']) {
                                cb(true, 'Please enter the data.');
                            }
                            pdb.insert(options['table'], options['data'], function (err, results, fields) {
                                if (options['query']) {
                                    console.log(pdb._last_query());
                                }
                                if (cb) {
                                    cb(err, results);
                                } else {
                                    if (pRes) {
                                        pRes.end(JSON.stringify(results));
                                    }
                                }
                            });
                        }
                );
            },
            select: function (options, cb) {
                load().db()(
                        function (pdb) {
                            if (options['where']) {
                                pdb.where(options['where']);
                            }
                            if (options['select']) {
                                pdb.select(options['select']);
                            }
                            if (options['limit']) {
                                if (options['offset']) {
                                    pdb.limit(options['limit'], options['offset']);//LIMIT 1 OFFSET 0;    
                                } else {
                                    pdb.limit(options['limit'], 0);//LIMIT 1 OFFSET 0;
                                }
                            }
                            if (!options['table']) {
                                cb(true, 'Please enter the name of the table.');
                            }
                            pdb.get(options['table'], function (err, results, fields) {
                                if (cb) {
                                    cb(err, results, pdb._last_query());
                                }
                            });
                        }
                );
            },
            query: function (query, cb) {
                load().db()(
                        function (pdb) {
                            pdb.query(query, function (err, results, fields) {
                                if (cb) {
                                    cb(err, results);
                                } else {
                                    if (pRes) {
                                        pRes.end(JSON.stringify(results));
                                    }
                                }
                            });
                        }
                );
            },
            delete: function (options, cb) {
                load().db()(
                        function (pdb) {

                            if (!options['table']) {
                                cb(true, 'Please enter the name of the table.');
                            }
                            if (!options['where']) {
                                cb(true, 'Please enter the where data.');
                            }

                            pdb
                                    .where(options['where'])
                                    .delete(options['table'], function (err, results, fields) {

                                        if (options['query']) {
                                            console.log(pdb._last_query());
                                        }
                                        if (cb) {
                                            cb(err, results);
                                        } else {
                                            if (pRes) {
                                                pRes.end(JSON.stringify(results));
                                            }
                                        }
                                    });
                        }
                );
            },
            join: function (options, cb) {
                load().db()(
                        function (pdb) {
                            if (options['where']) {
                                pdb.where(options['where']);
                            }
                            if (options['select']) {
                                pdb.select(options['select']);
                            }
                            if (!options['joinkey']) {
                                cb(true, 'Join key does not exist.');
                            }
                            if (!options['joinoption']) {
                                cb(true, 'join option does not exist.');
                            }
                            if (!options['jointable']) {
                                cb(true, 'join table does not exist.');
                            }
                            pdb.join(options['jointable'], options['joinkey'], options['joinoption']);
                            if (!options['table']) {
                                cb(true, 'Please enter the name of the table.');
                            }

                            if (options['order']) {
                                pdb.order_by(options['order']);
                            }
                            if (options['limit']) {
                                if (options['offset']) {
                                    pdb.limit(options['limit'], options['offset']);//LIMIT 1 OFFSET 0;    
                                } else {
                                    pdb.limit(options['limit'], 0);//LIMIT 1 OFFSET 0;
                                }
                            }

                            pdb
                                    .get(options['table'], function (err, results, fields) {
                                        if (options['query']) {
                                            console.log(pdb._last_query());
                                        }
                                        if (cb) {
                                            cb(err, results);
                                        } else {
                                            if (pRes) {
                                                pRes.end(JSON.stringify(results));
                                            }
                                        }
                                    });
                        }
                );
            }
        }
    }
}

node.prototype.test = function () {
    return {
        load: load(),
        db: db()
    }
}