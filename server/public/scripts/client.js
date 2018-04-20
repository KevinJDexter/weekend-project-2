console.log('client.js loaded');

$(document).ready(onReady);

function onReady () {
  console.log('jQuery loaded');
  $('.operation').on('click', runOperation);
  $('#btnClear').on('click', clearResults);
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
  $('input').val('');
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
      $('#resultsDiv').append(`<li>${response}</li>`);
    })
}