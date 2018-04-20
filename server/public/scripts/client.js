console.log('client.js loaded');

$(document).ready(onReady);

function onReady () {
  console.log('jQuery loaded');
  $('.operation').on('click', runOperation);
  $('#btnClear').on('click', clearResults);
}

function runOperation () {
  let firstNum = $('#firstValue');
  let secondNum = $('#secondValue');
  let result = '<li>It worked</li>';
  switch ($(this).text()) {
    case '+':
      console.log('+');
      break;

    case '-':
      console.log('-');
      break;
      
    case '/':
      console.log('/');
      break;
      
    case '*':
      console.log('*');
      break;
      
    default:
      console.log('awww');
      break;
  }
  $('#resultsDiv').append(result);
}

function clearResults () {
  $('#resultsDiv').empty();
}