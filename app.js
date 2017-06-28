const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
// const jsdom = require('jsdom');
const models = require('./models');

const app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');

//express.static told where to find css files
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
var todoIdx = 0;

// models.Todo.create({
//   title: "buy groceries",
//   priority: 4,
//   "due_date": new Date(2017, 5, 30),
// });

// models.Todo.create({
//   title: "fold laundry",
//   "due_date": new Date(2017, 6, 1),
//   completed: true
// });

// models.Todo.create({
//   title: "wash the dog",
//   "due_date": new Date(2017, 6, 12),
//   completed: false
// });
//
// models.Todo.create({
//   title: "clean kitchen",
//   "due_date": new Date(2017, 5, 29),
//   completed: true
// });


app.get('/', function(req, res){
  //  todoIdx = 0;
  models.Todo.findAll().then(function(todos){
    res.render('index', {model: todos});
  });
});

app.post('/', function (req, res){
  models.Todo.create({
    title: req.body.title,
    priority: req.body.priority,
    due_date: req.body.due_date,
    completed: req.body.completed,
    assignee: req.body.assignee
  });
  // var todoItems = context.todo;
  // //pushes into variable that I created
  // todoItems.push(req.body.to_do);
  res.redirect('/');
});

// app.post('/todo/:id', function (req, res){
//    console.log("working");
//    var id = req.params.id; //get address, look up, add to completed, delete from todo
//    var todo = context.todo.splice(id, 1);
//    context.completed.push(todo);
//    res.redirect('/');
//
// });

app.listen(3000, function(){
console.log("app started successfully!");
});


// var context = {
//   todo: [
//   'Buy groceries'
//   , 'Fold laundry'
//   , 'Wash the dog'
// ]
// , todoId: function(){
//   return todoIdx++;
// }
// , completed: [
//   'Clean kitchen'
//   ,'Do homework'
// ]
// , completedId: function(){
//   return completedIdx++;
// }
// };
