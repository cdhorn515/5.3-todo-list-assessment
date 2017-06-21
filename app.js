const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
// const jsdom = require('jsdom');
var qu

const app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');

//express.static told where to find css files
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
var todoIdx = 0;

var context = {
  todo: [
  'Buy groceries'
  , 'Fold laundry'
  , 'Wash the dog'
]
, todoId: function(){
  return todoIdx++;
}
, completed: [
  'Clean kitchen'
  ,'Do homework'
]
, completedId: function(){
  return completedIdx++;
}
};

app.get('/', function(req, res){
   todoIdx = 0;
  res.render('index', context);
});

app.post('/', function (req, res){
  var todoItems = context.todo;
  //pushes into variable that I created
  todoItems.push(req.body.to_do);
  res.redirect('/');
});

app.post('/todo/:id', function (req, res){
   console.log("working");
   var id = req.params.id; //get address, look up, add to completed, delete from todo
   var todo = context.todo.splice(id, 1);
   context.completed.push(todo);
   res.redirect('/');

});

app.listen(3000, function(){
console.log("app started successfully!");
});
