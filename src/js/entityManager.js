var EntityManager = new function() {
  var self = this;

  /**
   * @type {Object.<number, Entity[]>}
   * @private
   * */
  self._entities = [];

  /**
   * @type {CanvasRenderingContext2D[]}
   * */
  self._layersCtx = [];

  /**
   * @param {Entity} entity
   * @param {number} [priority=0]
   * @return {Entity}
   * */
  self.Add = function(entity, priority) {
    priority = priority || 0;
    (self._entities[priority] = self._entities[priority] || []).push(entity);
    return entity;
  };

  /**
   * @callback LoopFunction
   * @property {Entity} entity
   * */

  /**
   * @param {LoopFunction} fn
   * @return {Entity}
   * */
  self._loop = function(fn) {
    Object.keys(self._entities).forEach(function(key) {
      for(var i = 0;i < self._entities[key].length; i++) {
        fn(self._entities[key][i]);
      }
    });
  };

  /**
   * @param {number} dt
   * @return {void}
   * */
  self.Update = function(dt) {
    self._loop(function(entity) {
      entity.Update(dt);
    });
  };

  /**
   * @return {void}
   * */
  self.Render = function() {
    for(var i = 0; i < self._layersCtx.length; i++)
      self._layersCtx[i].clearRect(0, 0, Map.realWidth, Map.realHeight);

    self._loop(function(entity) {
      entity.Render(self._layersCtx);
    });
  };

  /**
   * @param {VoidCallback} cb
   * @return {void}
   * */
  self.Init = function(cb) {

    var layersHolder = id("map");

    for(var i = 0, canvas, ctx;i < LayersCount; i++) {
      self._layersCtx.push(
        (ctx = (canvas = get("canvas")).getContext("2d"))
      );

      canvas.style.transform = "translateZ(" + ( i * DISTANCE_BETWEEN_LAYERS ) + "px)";
      canvas.width = Map.realWidth;
      canvas.height = Map.realHeight;

      canvas.webkitImageSmoothingEnabled = false;
      canvas.mozImageSmoothingEnabled = false;
      canvas.imageSmoothingEnabled = false;

      layersHolder.appendChild(canvas);
    }

    cb();
  }
};

Camera.follow(
  PLAYER = Entity.new(
    "human",
    {
      position: tileToWorldSpace(new Point(1, 2))
    }
  )
);

Entity.new(
  "trap",
  {
    position: tileToWorldSpace(new Point(11, 3))
  }
);