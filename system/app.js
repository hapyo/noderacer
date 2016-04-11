/*!
 * Noderacer Copyright(c) 2016 
 * MIT Licensed
 */

var express = require('express');
GLOBAL.router = express.Router();

var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

//routes
var routes = require('../application/rest/index');


router.use(function(req, res) {       
    var router=new  (require("../system/core/Router"))();
    router.racer(res,req);          
});        
var Resource = require('express-resource');
var session = require('express-session');

var app = express();
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'uwotm8' }));
GLOBAL.d=path.resolve(__dirname, '../');

// VIEW engine Setup
app.set('views',GLOBAL.d+'/application/views');
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser()); //session middle ware
var timeout = require('connect-timeout'); //express v4

app.use(express.static(path.join(GLOBAL.d, 'public')));
app.use(methodOverride());

/*
 * Noderacer Directory Settings
 */
GLOBAL.dm=GLOBAL.d+"/application/model/";
GLOBAL.dc=GLOBAL.d+"/application/controller/";
GLOBAL.dv=GLOBAL.d+"/application/views/";
GLOBAL.dcfg=GLOBAL.d+"/application/config/";
GLOBAL.DIR_SYSTEM=GLOBAL.d+"/system/";
GLOBAL.uploads=GLOBAL.d+"/uploads/";
GLOBAL.img=GLOBAL.d+"/public/img/";
var msecurity=require(GLOBAL.DIR_SYSTEM+"libraries/Security.js");
GLOBAL.Security=new msecurity();
GLOBAL.loads=new function(){    
    return {
        core:function(pModuleName){
            return  require(GLOBAL.DIR_SYSTEM + "core/"+pModuleName);
        }
    };
};

//set routes
app.use('/', routes);
app.use(function(err, req, res, next) {
    if(err.status==404){
        res.statusCode = 404;
        res.send('Cant find that file, sorry!');
    }else{
        next('Sorry, Server Error');        
    }
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: 'ERROR#1 : '+err.message,
            error: err
        });
    });
}
module.exports = app;