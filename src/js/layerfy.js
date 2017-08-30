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
  wall: {
    gfx: "tiles",
    offset: TILE_SIZE * 2,
    size: TILE_SIZE,
    layers: 3,
    layersDef: "b2c2 b2c2 b2c2 b2 a"
  }
};

var Layers = {
  floor: [],
  wall: [],
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
   * @return {Array}
   */
  var layerfy = function(def) {
    var result = [], canvas, ctx, i = 0;

    while(i < def.layers) {
      ctx = (canvas = result[result.push(get("canvas")) - 1]).getContext("2d");
      canvas.width = def.size;
      canvas.height = def.size;

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

      /*document.body.appendChild(canvas);*/

      i++;
    }

    return Array.prototype.map.call(Decoder(def.layersDef), function(c) {
      return result[LayerToIndex.indexOf(c)];
    });
  };
}