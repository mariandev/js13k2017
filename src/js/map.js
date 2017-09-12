var Map = new function() {
  var self = this;

  /*

  "ieeeeeeek..",
  "h.......g..",
  "h.......g..",
  "h.......g..",
  "lffo.nffj..",
  "ieem.peek..",
  "h.......g..",
  "h.......g..",
  "h.......g..",
  "lfffffffj.."

  * */

  self.rawMapData = [
    "ieeeeeeek#iek",
    "h...c...pem.g",
    "h.....d.....g",
    "hd......nfo.g",
    "lfffo.nfj#lfj",
    "ieekh.peekiek",
    "h..gh....gh.g",
    "h..gh..d.pm.g",
    "h..gh.......g",
    "h..glo.nffffj",
    "h..pem.g##iek",
    "h......g##h.g",
    "h.c..nfj##h.g",
    "h....peeeem.g",
    "h...........g",
    "lffffffo...dg",
    "#######h..c.g",
    "ieeeeeem....g",
    "h...........g",
    "h.....no....g",
    "lfffffjlffffj"
  ]
    .map(function(t) {
      return t.replace(/\s/g, "").split("");
    })
    .reduce(function(a, v) {
      return a.concat(v)
    }, []);
  self.mapData = [];
  self.mapWidth = 13;
  self.mapHeight = 21;

  self.layers = [];

  var tileTypes = {
    ".": "air",
    "#": "solidWall",
    "b": "floor",
    "c": "columnHalf",
    "d": "columnFull",
    "e": "wallN",
    "f": "wallS",
    "g": "wallE",
    "h": "wallW",
    "i": "wallCornerNW",
    "j": "wallCornerSE",
    "k": "wallCornerSW",
    "l": "wallCornerNE",
    "m": "wallInnerCornerNW",
    "n": "wallInnerCornerSE",
    "o": "wallInnerCornerSW",
    "p": "wallInnerCornerNE"
  };


  /*for(var y = 0;y < self.mapHeight; y++) {
    for(var x = 0;x < self.mapWidth; x++) {
      var r = "a";

      if(y === 0 && x > 0 && x < self.mapWidth - 1) r = "e";
      else if(y === self.mapHeight - 1 && x > 0 && x < self.mapWidth - 1) r = "f";
      else if(x === self.mapWidth - 1 && y > 0 && y < self.mapWidth - 1) r = "g";
      else if(x === 0 && y > 0 && y < self.mapWidth - 1) r = "h";
      else if(x === 0 && y === 0) r = "i";
      else if(x === self.mapWidth - 1 && y === self.mapHeight - 1) r = "j";
      else if(x === self.mapWidth - 1 && y === 0) r = "k";
      else if(x === 0 && y === self.mapHeight -1) r = "l";
      else if(Math.random() < 0.05) r = "c";
      else if(Math.random() < 0.05) r = "d";

      self.rawMapData[y * self.mapWidth + x] = r;
    }
  }*/

  self.init = function() {
    self.realWidth = self.mapWidth * TILE_SIZE;
    self.realHeight = self.mapHeight * TILE_SIZE;

    self.layerOffsetX = (GAME_WIDTH - self.realWidth) / 2;
    self.layerOffsetY = (GAME_HEIGHT - self.realHeight) / 2;

    self.layersHolder = id("map");

    self.decodeMap();

    var i = LayersCount + 1; while(i--) self.renderLayer(i);
  };

  self.decodeMap = function() {
    self.mapData = self.rawMapData.map(function(tt) {
      return tileTypes[tt];
    });
  };

  self.renderLayer = function(layer) {
    var image = get("img"),
        canvas,
        ctx = (canvas = get("canvas")).getContext("2d");

    image.style.transform = "translateZ(" + (layer * DISTANCE_BETWEEN_LAYERS) + "px)";
    //image.style.zIndex = layer;

    canvas.width = self.realWidth;
    canvas.height = self.realHeight;

    canvas.webkitImageSmoothingEnabled = false;
    canvas.mozImageSmoothingEnabled = false;
    canvas.imageSmoothingEnabled = false;

    var isFloorLayer = !layer;
    if(!isFloorLayer) layer -= 1;

    self.mapData.forEach(function(tile, i) {

      tile = isFloorLayer ? "floor" : tile;

      var x = Math.floor(i % self.mapWidth) * TILE_SIZE;
      var y = Math.floor(i / self.mapWidth) * TILE_SIZE;

      if(!layer && !isFloorLayer && tile !== tileTypes["."]) {
        Physics.AddCollider("map", x, y, TILE_SIZE, TILE_SIZE);
      }

      Layers[tile] && Layers[tile][layer] && ctx.drawImage(
        Layers[tile][layer],
        x,
        y,
        TILE_SIZE,
        TILE_SIZE
      );
    });

    image.src = canvas.toDataURL();

    self.layersHolder.appendChild(image);
    self.layers[layer] = image;
  };

  self.update = function (dt) {
    var distance = 10 * 3;

    /* var qgs = GAME_SIZE.mul(0.125);
    var t = Mouse.positionFromCenter.mul(0.5).clamp(qgs.mul(-1), qgs).flat(ONE_OVER_GAME_SIZE.mul(8)).mul(-1);*/

    var t = Mouse.positionFromCenter.flat(ONE_OVER_GAME_SIZE.mul(2)).mul(-1);
    var tx = Math.abs(t.x); tx = tx * (2 - tx) * sgn(t.x);
    var ty = Math.abs(t.y); ty = ty * (2 - ty) * sgn(t.y);

    // tx = ty = 0;

    var x = Camera.position.x + tx * distance - HALF_TILE_SIZE;
    var y = Camera.position.y + ty * distance - HALF_TILE_SIZE;

    self.layersHolder.style.transform = "translate3d(" + x + "px, " + y + "px, " + Camera.zoom + "px)";
  };

};