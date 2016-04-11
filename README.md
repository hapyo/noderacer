# Noderacer

Node Racer is a minimal and flexible node.js web application framework. 


## Features ##
- Noderacer supports URL routing.
- Noderacer will present the project as a form of MVC model, the controller and the model, view.


## Run ##

If Node.js is installed, you can download and run the project.

	node server

## Project Structure ##


### /application ###

	/application
	/application/config  #Common configuration, DB configuration file locations.
	/application/controller # The controller file is located
	/application/views  # The template file is located
	/application/model  #The model file is located.
	/application/rest   #You can set a restful url.
	/application/libraries #The 3rd party library is located.

### /public ###

The static resources is located such as html, css, js.

### /systems ###

The core of the File of Nodercer.

## Sample Page ##

When you run a server, When you access a site, test page appears.

	http://localhost:30000

![](http://cfile26.uf.tistory.com/image/24643B37570BC8132D86C9)

Welcome Controller after running, try to select the following URL.

	ROUTE TEST
	http://localhost:3000
	http://localhost:3000/racer/print/true
	http://localhost:3000/racer/print/false
	http://localhost:3000/racer/print/text
	http://localhost:3000/racer/test/print
	http://localhost:3000/racer/test/print/text
	http://localhost:3000/racer/model/load
	
	GET TEST
	http://localhost:3000/racer/get/specific?test=3&test2=4
	http://localhost:3000/racer/get/all?test=3&test2=4
	http://localhost:3000/racer/get/json?test=3
	http://localhost:3000/racer/method
	http://localhost:3000/racer/is_get
	
	POST TEST
	http://localhost:3000/racer/post
	
	SESSION TEST
	http://localhost:3000/racer/session/set
	http://localhost:3000/racer/session/get


## URL Routing ##
You can take advantage of the routing capabilities in a manner to develop quickly. The URL is constructed as follows.

	controller name + function name

For example, if you have a function with the name of the controller and hello function, it can be invoked as follows:


	/racer/hello


## Model Loading ##

Models are optionally available for those who want to use a more traditional MVC approach.

	
	node.prototype.load = function (racer) {
	    var method = racer.req.method;
	    if (method == 'GET') {        
	        var mBoard = racer.load.model("test/model");
	        racer.view.out(mBoard.index());
	    } else if (method == 'POST') {
	    }    
	};



## Handling POST ##


It is easy to handle POST data. You can understand just read examples below.
	
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


## Handling GET ##

The same as the POST handling.

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


## DATABASE ##

Proceed with the settings in the file(application/config/database.js ). It includes the following configurations.

	var db = new Array;
	db['hostname'] = '127.0.0.1';
	db['username'] = 'root';
	db['password'] = '1234';
	db['database'] = 'test';
	db['dbdriver'] = 'mysql';
	exports.db=db;

Let's look at a simple example of the select.

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



> I am planning to supplement the code. We will be adding README Text.
> Thank You.
