console.log('client.js loaded');

$(document).ready(onReady);

let toReset = false;

function onReady () {
  console.log('jQuery loaded');
  $('.operation').on('click', runOperation);
  $('#btnEqual').on('click', submitEquation);
  $('.btnNum').on('click', addNum);
  $('#btnClearInputs').on('click', clearInputs);
  $('#btnClearAll').on('click', clearAll);
  populateHistory();
}

function clearAll () {
  clearInputs();
  clearResults();
}

// Appends number to the current number, clearing it first it toReset is triggered
function addNum () {
  if (toReset) {
    clearInputs();
    toReset = false;
  }
  $('#numField').val($('#numField').val() + $(this).text());
}

// Submits the given operation, trigering the toReset variable to enable clearing of the input
function runOperation () {
  let equation = {
    x: $('#numField').val(),
    type: $(this).val()
  }
  if (equation.x == '') {
    equation.x = '0';
  }
  addToEquation(equation);
  toReset = true;
}
  
// Clears the history of results, client side and server side
function clearResults () {
  $('#resultsDiv').empty();
}

// Commits the current equation to get answer
function submitEquation () {
  let x = $('#numField').val();
  if (x == '') {x = '0'};
  $.ajax({
    method: 'POST',
    url: '/submit-equation',
    data: {x: x}
  }).then( function (response) {
      logEquation();
      clearInputs();
    })
}

// Adds to the equation being built
function addToEquation (toAdd) {
  $.ajax({
    method: "POST",
    url: '/add-to-equation',
    data: toAdd
  })
    .then (function (response) {
      console.log(response);
    })
}

// Adds equation to DOM
function logEquation () {
  $.ajax({
    method: 'GET',
    url: '/compute'
  })
    .then (function (response) { 
      $('#resultsDiv').append(`<p>${response}</p>`);
    })
}

// Populates the History section with all equations on the server
function populateHistory () {
  $.ajax({
    method: 'GET',
    url: '/populate'
  })
    .then (function (response) {
      console.log('BOOM');
      response.forEach(equation => {
        $('#resultsDiv').append(`<p>${equation}</p>`);
      });
    })
}

// Clears the unput field
function clearInputs () {
  $('#numField').val('');
}
