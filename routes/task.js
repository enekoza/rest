
exports.getAll = function(req, res) {

  LokiDb = require('../lokiDb');
  //console.log(LokiDb.getText());
  var tasks = LokiDb.getTasks();

  //ret.rows = users.data;
  // console.log(lists);
  var queryRes = tasks.chain().find({idList: Number(req.params.id)}).data();
console.log(req.params.id);

      res.status(200).json(queryRes);

};

exports.put = function(req, res) {



  LokiDb = require('../lokiDb');
  console.log(req.body);
  var tasks = LokiDb.getTasks();
  //ret.rows = users.data;
  //var queryRes = users.update(req.body);
  LokiDb.upsert(tasks, "id", req.body);

  res.status(200).json(req.body);
};

exports.post = function(req, res) {

  LokiDb = require('../lokiDb');
  //console.log(LokiDb.getText());
  var tasks = LokiDb.getTasks();

  req.body["id"] = tasks.data.length+1;
  console.log("POST");
  console.log(req.body);
  console.log(tasks.data)
  tasks.insert(req.body);

  res.status(200).json(req.body);
};

exports.delete = function(req, res) {

  LokiDb = require('../lokiDb');
  //console.log(LokiDb.getText());
  var tasks = LokiDb.getTasks();

  var queryRes = tasks.chain().find({id: Number(req.params.id)}).data();
console.log(req.params.id);
console.log("DELETE");
console.log(queryRes)
  if (queryRes.length===1){
      tasks.remove(queryRes[0]);
      res.status(200).json(queryRes[0]);
  }
};

exports.done = function(req, res) {

  LokiDb = require('../lokiDb');
  //console.log(LokiDb.getText());
  var tasks = LokiDb.getTasks();

  var queryRes = tasks.chain().find({id: Number(req.params.id)}).data();

  var task = queryRes[0]
console.log(req.params.id);
console.log("done");
console.log(queryRes)
task["done"]=true;
    LokiDb.upsert(tasks, "id", task);
};

exports.undone = function(req, res) {

  LokiDb = require('../lokiDb');
  //console.log(LokiDb.getText());
  var tasks = LokiDb.getTasks();

  var queryRes = tasks.chain().find({id: Number(req.params.id)}).data();

  var task = queryRes[0]
console.log(req.params.id);
console.log("done");
console.log(queryRes)
task["done"]=false;
    LokiDb.upsert(tasks, "id", task);
};
