const express = require('express');
const bodyParser = require('body-parser');
const chrome = require('chrome-remote-interface');

const app = express();
app.use(bodyParser.json());

const options = {
    'port': 9991
};

// list tabs
app.get('/', function(req, res) {
    chrome.List(options, function(err, tabs) {
        if(err) {
            
        } else {
            res.json(tabs);
        }
    });
});

// new tab
app.put('/', function(req, res) {
    var params = req.body;
    options.url = params.url;
    chrome.New(options, function(err, tab) {
        if(err) {
            
        } else {
            res.json(tab);
        }
    });
});

// activate tab
app.post('/', function(req, res) {
    var params = req.body;
    options.id = params.id;
    chrome.Activate(options, function(err, tab) {
        if(err) {
            res.send(404);
        } else {
            res.send(200);
        }
    });
});

// close tab
app.delete('/', function(req, res) {
    var params = req.body;
    chrome.List(options, function(err, tabs) {
        if(err) {
            
        } else {
            // if there's only one tab open, don't close it
            // otherwise the entire process gets killed.
            // gotta keep at least one tab open!
            if(tabs.length > 1) {
                options.id = params.id;
                chrome.Close(options, function(err, tab) {
                    if(err) {
                        res.send(404);
                    } else {
                        res.send(200);
                    }
                });         
            } else {
                res.send(401);
            }
        }
    });
});

const http = require('http').Server(app);
http.listen(8888);
