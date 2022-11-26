import Game from './game';



window.onload = function() {
// TODO: ДОБАВИТЬ ТЕМЫ !!!!
  const game = new Game({
    ROW: 11,
    COL: 7
  });

// app init function
  function init() {
    game.init();
    setInterval(main, 100 / 6);
  }

// main game loop
  function main() {
    game.update();
    game.render();
  };
// on ready
  init();

};

if ('serviceWorker' in navigator) {
  // Register a service worker hosted at the root of the
  // site using the default scope.
  navigator.serviceWorker.register('./sw.js').then(function(registration) {
    console.log('Service worker registration succeeded:', registration);
  }, /*catch*/ function(error) {
    console.log('Service worker registration failed:', error);
  });
} else {
  console.log('Service workers are not supported.');
}


