const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

let computation = {
  x: '0',
  y: '0',
  type: 'Add'
}

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended : true}));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/compute', (req, res) => {
  res.send(`${computation.x} ${getOperand()} ${computation.y} = ${compute()}`);
})

function compute () {
  let x = Number(computation.x);
  let y = Number(computation.y);
  switch (computation.type) {
    case 'Add':
      return x + y;
      break;
  
    case 'Subtract':
      return x - y;
      break;
  
    case 'Multiply':
      return x * y;
      break;
  
    case 'Divide':
      return x / y;
      break;
  
    default:
      break;
  }
}

function getOperand () {
  switch (computation.type) {
    case 'Add':
      return '+';
      break;
  
    case 'Subtract':
      return '-';
      break;
  
    case 'Multiply':
      return '*';
      break;
  
    case 'Divide':
      return '/';
      break;
  
    default:
      break;
  }
}