// console.log('Hello Dave...');
let player = {};
let orbs = [];
let players = [];

// Set Canvas Background
let windowHeight = $(window).height();
let windowWidth = $(window).width();

let canvas = document.getElementById('the-canvas');
let context = canvas.getContext('2d');
canvas.width = windowWidth;
canvas.height = windowHeight;

// Show Login Modal on Page Load
$(window).load(() => {
  $('#loginModal').modal('show');
});

// Handle Login Modal Form Submit
$('.name-form').submit(event => {
  event.preventDefault();
  player.name = $('#name-input').val();
  $('#name-input').val('');
  $('#loginModal').modal('hide');
  $('#spawnModal').modal('show');
  $('.player-name').text(player.name);
  console.log(player.name);
});

// Handle Game Start Modal Click
$('.start-game').on('click', () => {
  $('.modal').modal('hide');
  $('.hiddenOnStart').removeAttr('hidden');
  init();
});
