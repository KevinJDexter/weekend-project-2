console.log('client.js loaded');

$(document).ready(onReady);

function onReady () {
  console.log('jQuery loaded');
  $('.operation').on('click', runOperation);
  $('#btnClearInputs').on('click', clearInputs);
  // $('#btnClear').on('click', clearResults);
  populateHistory();
}

function runOperation () {
  let equation = {
    x: $('#firstValue').val(),
    y: $('#secondValue').val(),
    type: $(this).val()
  }
  if (equation.x == '') {
    equation.x = '0';
  }
  if (equation.y == '') {
    equation.y = '0';
  }
  
  submitEquation(equation);
  // $('input').val('');
}

function clearResults () {
  $('#resultsDiv').empty();
}

function submitEquation (equation) {
  $.ajax({
    method: 'POST',
    url: '/submit-equation',
    data: equation
  })
    .then( function (response) {
      logEquation();
    })
}

function logEquation () {
  $.ajax({
    method: 'GET',
    url: 'compute'
  })
    .then (function (response) { 
      $('#resultsDiv').append(`<p>${response}</p>`);
    })
}

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

function clearInputs () {
  $('#firstValue').val('');
  $('#secondValue').val('');
}