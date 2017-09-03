var LayerToIndex = "abcdefghijklmnopqrstuvwxyz";

var LayersCount = 15;

var LayersDef = {
  floor: {
    gfx: "tiles",
    offset: 0,
    size: TILE_SIZE,
    layers: 2,
    layersDef: "a b14"
  },
  column: {
    gfx: "tiles",
    offset: TILE_SIZE,
    size: TILE_SIZE,
    layers: 5,
    layersDef: "a be dc3 dc3 dc eb"
    // layersDef: "a b2e2 b2e2 b2e2 b2"
  },
  wallN: {
    gfx: "tiles",
    offset: TILE_SIZE * 2,
    size: TILE_SIZE,
    layers: 5,
    layersDef: "a b5 c4 d3 e2"
  },
  wallS: {
    gfx: "tiles",
    offset: TILE_SIZE * 2,
    size: TILE_SIZE,
    layers: 5,
    layersDef: "a b5 c4 d3 e2",
    rotation: Math.PI
  },
  wallE: {
    gfx: "tiles",
    offset: TILE_SIZE * 2,
    size: TILE_SIZE,
    layers: 5,
    layersDef: "a b5 c4 d3 e2",
    rotation: Math.PI / 2
  },
  wallW: {
    gfx: "tiles",
    offset: TILE_SIZE * 2,
    size: TILE_SIZE,
    layers: 5,
    layersDef: "a b5 c4 d3 e2",
    rotation: Math.PI * 3 / 2
  },
  wallCorner: {
    gfx: "tiles",
    offset: TILE_SIZE * 3,
    size: TILE_SIZE,
    layers: 1,
    layersDef: "a15"
  }
};

var Layers = {
  floor: [],
  wallN: [],
  wallS: [],
  wallE: [],
  wallW: [],
  wallCorner: [],
  column: []
};

var LayersCreator = new function() {
  var self = this;

  /**
   * @callback VoidCallback
   * @return {void}
   * */

  /**
   * @param {VoidCallback} cb
   * @return {void}
   */
  self.init = function(cb) {
    Object.keys(LayersDef).forEach(function(key) {
      Layers[key] = layerfy(LayersDef[key]);
    });

    cb();
  };

  /**
   * @param {object} def
   * @param {string} def.gfx
   * @param {number} def.offset
   * @param {number} def.size
   * @param {number} def.layers
   * @param {string} def.layersDef
   * @param {number} [def.rotation]
   * @return {Array}
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
        GFX[def.gfx].canvas,
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

    return Array.prototype.map.call(Decoder(def.layersDef), function(c) {
      return result[LayerToIndex.indexOf(c)];
    });
  };
}