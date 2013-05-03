;(function() {
  var Game = function(canvasId) {
    this.ctx = document.getElementById(canvasId).getContext('2d');

    this.inputter = new Framework.Inputter();
    this.updater = new Framework.Updater();
    this.entities = new Framework.Entities();
    this.collider = new Framework.Collider();

    this.update = function() {
      // clears the background
      this.ctx.fillStyle = "#000";
      this.ctx.fillRect(0, 0, 300, 150);
    };

    this.start = function() {
      this.updater.add(this);
      this.updater.add(this.collider);

      this.entities.create(Person, { x:135, y:40,  w:9, h:9, color:"#0f0" }); // paramour
      this.entities.create(Person, { x:140, y:110, w:9, h:9, color:"#f00", // player
        update: function() {
          if (game.inputter.state[38] === true) {
            this.y -= 0.4;
          }
          this.draw();
        },
        collision: function(other) {
          other.y = this.y; // follow the player
        }
      });
    };
  };

  var Person = function(game, settings) {
    this.draw = function() {
      game.ctx.fillStyle = this.color;
      game.ctx.fillRect(this.x, this.y, this.w, this.h);
    };

    this.update = this.draw;
    this.collision = function() {};
    for (var i in settings) {
      this[i] = settings[i];
    }
  };

  window.addEventListener('load', function() {
    game = new Game("canvas");
    game.start();
  });
})();
