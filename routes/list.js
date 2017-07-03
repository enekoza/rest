
exports.getAll = function(req, res) {

  LokiDb = require('../lokiDb');
  //console.log(LokiDb.getText());
  var lists = LokiDb.getLists();

  //ret.rows = users.data;
  // console.log(lists);
  // var queryRes = lists.chain().find({id: req.params.id}).data();
// console.log(req.params.id);

      res.status(200).json(lists.data);

};

exports.get = function(req, res) {

  LokiDb = require('../lokiDb');
  //console.log(LokiDb.getText());
  var lists = LokiDb.getLists();

  //ret.rows = users.data;
  // console.log(lists);
  var queryRes = lists.chain().find({id: Number(req.params.id)}).data();
// console.log(req.params.id);

      res.status(200).json(queryRes[0]);

};

exports.put = function(req, res) {



  LokiDb = require('../lokiDb');
  console.log(req.body);
  var lists = LokiDb.getLists();
  //ret.rows = users.data;
  //var queryRes = users.update(req.body);
  LokiDb.upsert(lists, "id", req.body);

  res.status(200).json(req.body);
};

exports.post = function(req, res) {

  LokiDb = require('../lokiDb');
  //console.log(LokiDb.getText());
  var lists = LokiDb.getLists();

  req.body["id"] = lists.data.length+1;
  console.log("POST");
  console.log(req.body);
  console.log(lists.data)
  lists.insert(req.body);

  res.status(200).json(req.body);
};

exports.delete = function(req, res) {

  LokiDb = require('../lokiDb');
  //console.log(LokiDb.getText());
  var lists = LokiDb.getLists();

  var queryRes = lists.chain().find({id: Number(req.params.id)}).data();
console.log(req.params.id);
console.log("DELETE");
console.log(queryRes)
  if (queryRes.length===1){
      lists.remove(queryRes[0]);
      res.status(200).json(queryRes[0]);
  }
};
