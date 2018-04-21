const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

const Calculator = require('./modules/calculator');
const computation = new Calculator();

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended : true}));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/compute', (req, res) => {
  computation.compute();
  computation.addToCurrentEquation();
  let toSend = computation.submitEquation();
  res.send(toSend);
})

app.get('/populate', (req, res) => {
  res.send(computation.history);
})

app.post('/submit-equation', (req, res) => {
  computation.x = req.body.x;
  computation.y = req.body.y;
  computation.type = req.body.type;
  res.sendStatus(200);
})