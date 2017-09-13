var LayerToIndex = "abcdefghijklmnopqrstuvwxyz";

/**
 * @typedef {object} LayerDef
 * @property {string} gfx
 * @property {number} offset
 * @property {number} size
 * @property {number} layers
 * @property {string} layersDef
 * @property {number} [rotation]
 * */

/**
 * @type {Object.<string, LayerDef>}
 * */
window.LayersDef = {
  "floor": {
    "gfx": "tiles",
    "offset": 0,
    "size": TILE_SIZE,
    "layers": 1,
    "layersDef": "a"
  },
  "wallN": {
    "gfx": "tiles",
    "offset": TILE_SIZE * 2,
    "size": TILE_SIZE,
    "layers": 10,
    "layersDef": "af2 bg2 ch2 di2 ej2"
    // layersDef: "a2e b2f c2g d2h a2e"
  },
  "wallS": {
    "gfx": "tiles",
    "offset": TILE_SIZE * 2,
    "size": TILE_SIZE,
    "layers": 10,
    "layersDef": "af2 bg2 ch2 di2 ej2",
    "rotation": Math.PI
  },
  "wallE": {
    "gfx": "tiles",
    "offset": TILE_SIZE * 2,
    "size": TILE_SIZE,
    "layers": 10,
    "layersDef": "af2 bg2 ch2 di2 ej2",
    "rotation": Math.PI / 2
  },
  "wallW": {
    "gfx": "tiles",
    "offset": TILE_SIZE * 2,
    "size": TILE_SIZE,
    "layers": 10,
    "layersDef": "af2 bg2 ch2 di2 ej2",
    "rotation": Math.PI * 3 / 2
  },
  "wallCornerNW": {
    "gfx": "tiles",
    "offset": TILE_SIZE * 3,
    "size": TILE_SIZE,
    "layers": 10,
    "layersDef": "af2 bg2 ch2 di2 ej2"
  },
  "wallCornerSE": {
    "gfx": "tiles",
    "offset": TILE_SIZE * 3,
    "size": TILE_SIZE,
    "layers": 10,
    "layersDef": "af2 bg2 ch2 di2 ej2",
    "rotation": Math.PI
  },
  "wallCornerSW": {
    "gfx": "tiles",
    "offset": TILE_SIZE * 3,
    "size": TILE_SIZE,
    "layers": 10,
    "layersDef": "af2 bg2 ch2 di2 ej2",
    "rotation": Math.PI / 2
  },
  "wallInnerCornerSW": {
    "gfx": "tiles",
    "offset": TILE_SIZE * 4,
    "size": TILE_SIZE,
    "layers": 10,
    "layersDef": "af2 bg2 ch2 di2 ej2",
    "rotation": Math.PI * 3 / 2
  },
  "wallInnerCornerNW": {
    "gfx": "tiles",
    "offset": TILE_SIZE * 4,
    "size": TILE_SIZE,
    "layers": 10,
    "layersDef": "af2 bg2 ch2 di2 ej2"
  },
  "wallInnerCornerSE": {
    "gfx": "tiles",
    "offset": TILE_SIZE * 4,
    "size": TILE_SIZE,
    "layers": 10,
    "layersDef": "af2 bg2 ch2 di2 ej2",
    "rotation": Math.PI
  },
  "wallInnerCornerNE": {
    "gfx": "tiles",
    "offset": TILE_SIZE * 4,
    "size": TILE_SIZE,
    "layers": 10,
    "layersDef": "af2 bg2 ch2 di2 ej2",
    "rotation": Math.PI / 2
  },
  "wallCornerNE": {
    "gfx": "tiles",
    "offset": TILE_SIZE * 3,
    "size": TILE_SIZE,
    "layers": 10,
    "layersDef": "af2 bg2 ch2 di2 ej2",
    "rotation": Math.PI * 3 / 2
  },
  "columnHalf": {
    "gfx": "tiles",
    "offset": TILE_SIZE * 5,
    "size": TILE_SIZE,
    "layers": 8,
    "layersDef": "a2e bf c3g"
  },
  "columnFull": {
    "gfx": "tiles",
    "offset": TILE_SIZE * 5,
    "size": TILE_SIZE,
    "layers": 8,
    "layersDef": "a2e bf c5g d3h"
  },
  "human": {
    "gfx": "tiles",
    "offset": TILE_SIZE * 6,
    "size": TILE_SIZE,
    "layers": 6,
    "layersDef": "e4 f2 c4 d2 b2 a"
  },
  "solidWall": {
    "gfx": "tiles",
    "offset": TILE_SIZE * 8,
    "size": TILE_SIZE,
    "layers": 1,
    "layersDef": "a15"
  },
  "trap": {
    "gfx": "tiles",
    "offset": TILE_SIZE,
    "size": TILE_SIZE,
    "layers": 2,
    "layersDef": "ab"
  },
  "crystal": {
    "gfx": "tiles",
    "offset": TILE_SIZE * 7,
    "size": TILE_SIZE,
    "layers": 6,
    "layersDef": "ad be cf be ad"
  },
  "exit": {
    "gfx": "tiles",
    "offset": TILE_SIZE * 7,
    "size": TILE_SIZE,
    "layers": 6,
    "layersDef": "f"
  }
};

/**
 * @type {Object.<string, HTMLCanvasElement[]>}
 * */
var Layers = {};

var LayersCreator = new function() {
  var self = this;

  /**
   * @param {VoidCallback} cb
   * @return {void}
   */
  self.init = function(cb) {
    Object.keys(window.LayersDef).forEach(function(key) {
      Layers[key] = layerfy(window.LayersDef[key]);
    });

    cb();
  };

  /**
   * @param {LayerDef} def
   * @return {HTMLCanvasElement[]}
   */
  var layerfy = function(def) {
    var result = [], canvas, ctx, i = 0;

    while(i < def.layers) {
      ctx = (canvas = result[result.push(get("canvas")) - 1]).getContext("2d");
      canvas.width = def.size;
      canvas.height = def.size;

      var hs = def.size / 2;

      if(def.rotation) {
        ctx.save();
        ctx.translate(hs, hs);
        ctx.rotate(def.rotation);
        ctx.translate(-hs, -hs);
      }

      ctx.drawImage(
        GFX[def["gfx"]].canvas,
        def.offset,
        def.size * i,
        def.size,
        def.size,
        0,
        0,
        def.size,
        def.size
      );

      if(def.rotation) {
        ctx.restore();
      }

      /*document.body.appendChild(canvas);*/

      i++;
    }

    return Array.prototype.map.call(Decoder(def["layersDef"]), function(c) {
      return result[LayerToIndex.indexOf(c)];
    });
  };
};