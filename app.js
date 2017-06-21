const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');

const app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');

//express.static told where to find css files
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

const context = {
  todo: [
  'Buy groceries'
  , 'Fold laundry'
  , 'Wash the dog'
]
, completed: [
  'Clean kitchen'
  ,'Do homework'
]
};

var todoItems = context.todo;

app.get('/', function(req, res){
  res.render('index', context);
});

app.post('/', function (req, res){
  //pushes into variable that I created
  todoItems.push(req.body.to_do);
  res.render('index', context);
});

app.listen(3000, function(){
console.log("app started successfully!");
});
