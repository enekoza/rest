// var LokiDb = function () {};
//
// LokiDb.prototype = {
//   _db:
//   log = function () {
//     console.log('doo!');
//   }
// }

var lokijs = require('lokijs'),
    lokiNativescriptAdapter = require('lokijs/src/loki-nativescript-adapter'),
    dummyjson = require('dummy-json'),
    _ = require('lodash');

var LokiDb = (function() {
    // the $ symbol is an imported alias

    // private variable
    var texto = "default";
    var _db;
    var _tasks;
    var _lists;

    var _dashboard;

    // private function
    function log()
    {
        console.log('doo!');
    }

    function setText(text){
      texto = text;
    }

    function getText(){
      return texto;
    }

    function getTasks(){
      return _tasks;
    }

    function getLists(){
      return _lists;
    }


    function upsert(collection, idField, record) {
      var query = {};
          query[idField] = record[idField];
      var existingRecord = collection.findOne(query);

      if (existingRecord) {
        // The record exists. Do an update.
        var updatedRecord = existingRecord;
        // Only update the fields contained in `record`. All fields not contained
        // in `record` remain unchanged.
        _.forEach(record, function(value, key){
          updatedRecord[key] = value;
        });
        collection.update(updatedRecord);
      } else {
        // The record doesn't exist. Do an insert.
        collection.insert(record);
      }
    }


    function _init(){
      _db = new lokijs('uda.json',{
                  adapter: new lokiNativescriptAdapter()
      });

      _tasks = _db.addCollection('tasks', { indices: ['id'] });
      _lists = _db.addCollection('lists', { indices: ['id'] });



      var myHelpers = {
        rol: function() {
          // Use randomArrayItem to ensure the seeded random number generator is used
          return dummyjson.utils.randomArrayItem(['administrador', 'desarrollador', 'espectador', 'informador', 'manager']);
        }
      };

        _lists.insert({id: 1, name: "UDA", description: "Lista de tareas de UDA"});
        _lists.insert({id: 2, name: "SQA", description: "Lista de tareas de SQA"});
        _lists.insert({id: 3, name: "Grupo W", description: "Lista de tareas del Grupo W"});
        _lists.insert({id: 4, name: "CAC", description: "Lista de tareas de CAC"});

        _tasks.insert({id: 1, name: "Tarea 1", idList: 1} );
        _tasks.insert({id: 2, name: "Tarea 2", idList: 1} );
        _tasks.insert({id: 3, name: "Tarea 3", idList: 1} );
        _tasks.insert({id: 4, name: "Tarea 1", idList: 2} );
        _tasks.insert({id: 5, name: "Tarea 2", idList: 2} );
        _tasks.insert({id: 6, name: "Tarea 1", idList: 3} );
        _tasks.insert({id: 7, name: "Tarea 1", idList: 4} );
        _tasks.insert({id: 8, name: "Tarea 2", idList: 4} );

    }

    // return public interface
    return {
        log: function() {
            // we have access to the private function here
            // as well as the private variable (btw)
            log();
        },
        setText: function(text){
          setText(text);
        },
        initialize: function(){
            _init();
        },
        getTasks: function(){
          return getTasks();
        },
        getLists: function(){
          return getLists();
        },
        upsert: function(collection, idField, record){
          return upsert(collection, idField, record);
        },
        // Dashboard
        dashboard:{
          getAll: function(userId){
            return getDashboard();
          }
        }

    }
}()); // we import jQuery as a global symbol

module.exports = LokiDb;
