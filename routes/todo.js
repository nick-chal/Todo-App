var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://test:test@ds263948.mlab.com:63948/nickchal-todo');

var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);


//var data =[{item: 'Get Milk'}, {item: 'Walk Dog'}, {item: 'Kick some coding ass'}]

var urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/', function(req, res, next) {
    //get data from mongoDB;
    Todo.find({}, function (err, data) {
        if(err) throw err;
        res.render('todo', { title: 'Todo List', todos: data});
    });
});

router.post('/', urlencodedParser, function(req, res, next) {
    //get data from view and add to mongoDB
    var newTodo = Todo(req.body).save(function (err, data) {
        if(err) throw err;
        res.json(data);
        console.log(req.params);
    });
});

router.delete('/:item', function (req, res) {
    //delete the requested item from mongoDB

    Todo.find({item: req.params.item.replace(/\-/g, ' ')}).remove(function (err, data) {
        if(err) throw err;
        res.json(data);
    });
    console.log(req.params.item);

});



module.exports = router;
