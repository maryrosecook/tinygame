;(function(exports) {
  exports.Framework = {};

  exports.Framework.Inputter = function() {
    this.state = {};
    var self = this;
		window.addEventListener('keydown', function(e) {
      self.state[e.keyCode] = true;
    });

		window.addEventListener('keyup', function(e) {
      self.state[e.keyCode] = false;
    });
  };

  exports.Framework.Updater = function() {
    this.updatees = [];

    this.add = function(updatee) {
      this.updatees.push(updatee);
    };

    var self = this;
    var loop = function() {
      for (var i = 0; i < self.updatees.length; i++) {
        self.updatees[i].update();
      }
      requestAnimationFrame(loop); // queue the next tick of the loop
    };
    requestAnimationFrame(loop); // kick off the game loop
  };

  exports.Framework.Entities = function() {
    this.all = [];

    this.create = function(Constructor, settings) {
	    var entity = new Constructor(game, settings || {});
      game.updater.add(entity);
      this.all.push(entity);
    };
  };

  exports.Framework.Collider = function() {
    this.update = function() {
      var ent = game.entities.all;
      for (var i = 0, len = ent.length; i < len; i++) {
        for (var j = i + 1; j < len; j++) {
          // rectangle/rectangle collisions
          if (!(ent[i].x + ent[i].w < ent[j].x ||
                ent[i].x > ent[j].x + ent[j].w ||
                ent[i].y > ent[j].y + ent[j].h ||
                ent[i].y + ent[i].h < ent[j].y)) {
            ent[i].collision(ent[j]);
            ent[j].collision(ent[i]);
          }
        }
      }
    };
  };
})(this);
