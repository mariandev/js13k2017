var MAP = function() {
  var self = this;

  self.tileSize = 128;

  self.scaleFactor = .75;
  self.invScaleFactor = 1 / self.scaleFactor;

  self.layers = 40;
  self.scalePerLayer = .05 / self.layers;

  self.data = [];

  for(var y = 0;y < 100; y++) {
    self.data[y] = [];
    for(var x = 0;x < 100; x++) {
      self.data[y][x] = Math.floor(Math.random() * 3);
    }
  }

  self.mapWidth = self.data[0].length * self.tileSize;
  self.mapHeight = self.data.length * self.tileSize;

  self.mapCanvas = null;
  self.mapCtx = null;

  self.init = function() {
    //self.upscaleTilesGFX();
    self.renderMap();
  };

  /*self.upscaleTilesGFX = function() {
    self.tilesCanvas = document.createElement("canvas");
    self.tilesCanvas.width = GFX.tiles.canvas.width * self.tilesGXFUpscaleFactor;
    self.tilesCanvas.height = GFX.tiles.canvas.height * self.tilesGXFUpscaleFactor;

    self.tilesCtx = self.tilesCanvas.getContext("2d");

    var rawData = GFX.tiles.ctx.getImageData(0, 0, GFX.tiles.canvas.width, GFX.tiles.canvas.height);
    var data = [];

    for(var i = 0;i < rawData.length; i += 4) {
      var k = i * self.tilesGXFUpscaleFactor;
      for(var j = 0;j < 4;j++) data[k + j] = rawData[i + j];
    }

    self.tilesCtx.putImageData(new ImageData(new Uint8ClampedArray(data), self.tilesCanvas.width, self.tilesCanvas.height), 0, 0);

  };*/

  self.renderMap = function() {
    self.mapCanvas = document.createElement("canvas");
    self.mapCanvas.width = self.mapWidth;
    self.mapCanvas.height = self.mapHeight;

    self.mapCanvas.webkitImageSmoothingEnabled = false;
    self.mapCanvas.mozImageSmoothingEnabled = false;
    self.mapCanvas.imageSmoothingEnabled = false;

    self.mapCtx = self.mapCanvas.getContext("2d");

    self.data.forEach(function(row, y) {
      row.forEach(function(tile, x) {

        self.mapCtx.drawImage(
          GFX.tiles.canvas,
          self.tileSize * tile,
          0,
          self.tileSize,
          self.tileSize,
          x * self.tileSize,
          y * self.tileSize,
          self.tileSize,
          self.tileSize
        );

      });
    });

    //document.body.appendChild(self.mapCanvas);
  };

  self.renderMapAt = function(ctx, x, y) {
    var w = GAME_WIDTH;
    var h = GAME_HEIGHT;

    var fn = function(scale) {
      var invScale = 1 / scale;
      ctx.save();

      ctx.translate(w / 2, h / 2);
      ctx.scale(scale, scale);

      ctx.drawImage(
        self.mapCanvas,
        ( x - w / 2 ) * self.invScaleFactor,
        ( y - h / 2 ) * self.invScaleFactor,
        ( w         ) * self.invScaleFactor,
        ( h         ) * self.invScaleFactor,
        ( -w / 2    ) * self.invScaleFactor,
        ( -h / 2    ) * self.invScaleFactor,
        ( w         ) * self.invScaleFactor,
        ( h         ) * self.invScaleFactor
      );

      ctx.restore();
    };

    for(var i = 0;i < self.layers; i++) {
      fn(self.scaleFactor + self.scalePerLayer * i);
    }

  };


};