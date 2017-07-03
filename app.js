var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");

var    lokijs = require('lokijs'),
    LokiDb = require('./lokiDb'),
    lokiNativescriptAdapter = require('lokijs/src/loki-nativescript-adapter');

    var routesLists = require('./routes/list');
    var routesTask = require('./routes/task');
    // mongoose = require('mongoose');

    LokiDb.log();
    LokiDb.initialize();



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");

    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
      //respond with 200
      res.send(200);
    }
    else {
    //move on
      next();
    }
});

app.get('/rest/list', routesLists.getAll);
app.get('/rest/list/:id', routesLists.get);
app.post('/rest/list', routesLists.post);
app.put('/rest/list', routesLists.put);
app.delete('/rest/list/:id', routesLists.delete);

app.get('/rest/list/:id/task', routesTask.getAll);
app.post('/rest/task', routesTask.post);
app.put('/rest/task', routesTask.put);
app.delete('/rest/task/:id', routesTask.delete);
app.put('/rest/task/:id/done/true', routesTask.done);
app.put('/rest/task/:id/done/false', routesTask.undone);

var router = express.Router();

router.get('/', function(req, res) {
   res.send("Hello World!");
});

app.use(router);

app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});


var todoApp = express.Router();

//
// tvshows.route('/tvshows')
//   .get(TVShowCtrl.findAllTVShows)
//   .post(TVShowCtrl.addTVShow);
//
// tvshows.route('/tvshows/:id')
//   .get(TVShowCtrl.findById)
//   .put(TVShowCtrl.updateTVShow)
//   .delete(TVShowCtrl.deleteTVShow);
