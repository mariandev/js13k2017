var Map = new function() {
  var self = this;

  self.rawMapData = [];
  self.mapData = [];
  self.mapWidth = 11;
  self.mapHeight = 11;

  self.layers = [];

  var tileTypes = {
    b: "floor",
    c: "column",
    d: "wallN",
    e: "wallS",
    f: "wallE",
    g: "wallW",
    h: "wallCorner"
  };

  for(var y = 0;y < self.mapHeight; y++) {
    for(var x = 0;x < self.mapWidth; x++) {
      var r = "b";

      if(y === 0 && x > 0 && x < self.mapWidth - 1) r = "d";
      else if(y === self.mapHeight - 1 && x > 0 && x < self.mapWidth - 1) r = "e";
      else if(x === self.mapWidth - 1 && y > 0 && y < self.mapWidth - 1) r = "f";
      else if(x === 0 && y > 0 && y < self.mapWidth - 1) r = "g";
      else if( (x === 0 && y === 0) ||
               (x === 0 && y === self.mapHeight -1) ||
               (x === self.mapWidth - 1 && y === 0) ||
               (x === self.mapWidth - 1 && y === self.mapHeight - 1)) r = "h";
      else if(Math.random() < 0.05) r = "c";
      // else if(y === Math.floor(self.mapHeight / 2) && x === Math.floor(self.mapWidth / 2)) r = "c";
      // else if((x % 2 === y % 2)) r = "c";

      self.rawMapData[y * self.mapWidth + x] = r;
    }
  }

  self.init = function() {
    self.realWidth = self.mapWidth * TILE_SIZE;
    self.realHeight = self.mapHeight * TILE_SIZE;

    self.layerOffsetX = (GAME_WIDTH - self.realWidth) / 2;
    self.layerOffsetY = (GAME_HEIGHT - self.realHeight) / 2;

    self.layersHolder = id("map");

    self.decodeMap();

    var i = LayersCount; while(i--) self.renderLayer(i);
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

    canvas.width = self.realWidth;
    canvas.height = self.realHeight;

    canvas.webkitImageSmoothingEnabled = false;
    canvas.mozImageSmoothingEnabled = false;
    canvas.imageSmoothingEnabled = false;

    self.mapData.forEach(function(tile, i) {
      Layers[tile][layer] && ctx.drawImage(
        Layers[tile][layer],
        Math.floor(i % self.mapWidth) * TILE_SIZE,
        Math.floor(i / self.mapWidth) * TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE
      );
    });

    image.src = canvas.toDataURL();

    image.style.transform = "translateZ(" + (layer * 10) + "px)";
    image.style.zIndex = layer;

    self.layersHolder.appendChild(image);
    self.layers[layer] = image;
  };

  self.update = function (dt) {
    var distance = 10;

    /* var qgs = GAME_SIZE.mul(0.125);
    var t = Mouse.positionFromCenter.mul(0.5).clamp(qgs.mul(-1), qgs).flat(ONE_OVER_GAME_SIZE.mul(8)).mul(-1);*/

    var t = Mouse.positionFromCenter.flat(ONE_OVER_GAME_SIZE.mul(2)).mul(-1);
    var tx = Math.abs(t.x); tx = tx * (2 - tx) * sgn(t.x);
    var ty = Math.abs(t.y); ty = ty * (2 - ty) * sgn(t.y);

    tx = ty = 0;

    var x = Camera.position.x + tx * distance;
    var y = Camera.position.y + ty * distance;

    self.layersHolder.style.transform = "translate3d(" + x + "px, " + y + "px, " + Camera.zoom + "px)";
  };

};