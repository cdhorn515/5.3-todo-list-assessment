const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const data = require('./data');

const app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', function(req, res){
  res.render('index', {});
});

app.post('/', function (req, res){
  let context = {};
  context['list_item'] = req.body.list_item;
  res.render('index', context);
});

app.listen(3000, function(){
console.log("app started successfully!");
});
