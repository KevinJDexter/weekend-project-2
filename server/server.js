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

// sends the most recent equation in the history to the client
app.get('/compute', (req, res) => {
  let toSend = computation.history[computation.history.length-1];
  res.send(toSend);
})

// Sends the history served on the server to the client
app.get('/populate', (req, res) => {
  res.send(computation.history);
})

// Appends latest operation to the current equation
app.post('/add-to-equation', (req, res) => {
  computation.addToCurrentEquation (req.body);
  res.sendStatus(200);
});

// Submits the final value to compute the equation
app.post('/submit-equation', (req, res) => {
  computation.submitEquation(req.body.x);
  res.sendStatus(200);
})

app.delete('/delete-history', (req, res) => {

})
