/**
 * @callback InitFunction
 * @param {Entity} entity
 * @return {void}
 * */

/**
 * @callback UpdateFunction
 * @param {Entity} entity
 * @param {number} dt
 * @return {void}
 * */

/**
 * @callback RenderFunction
 * @param {Entity} entity
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} layer
 * @return {void}
 * */

/**
 * @typedef {Object} EntityDef
 * @property {string | string[]} gfx
 * @property {Point} position
 * @property {InitFunction} onInit
 * @property {UpdateFunction} onUpdate
 * @property {RenderFunction} onRender
 * */

/**
 * @typedef {Object} EntityDefOptionals
 * @property {string | string[]} [gfx]
 * @property {Point} [position]
 * @property {InitFunction} [onInit]
 * @property {UpdateFunction} [onUpdate]
 * @property {RenderFunction} [onRender]
 * */

/**
 * @class Entity
 * @param {EntityDef} def
 * */
function Entity(def) {
  var self = this;

  /** @private */
  self._def = def;

  self.position = def.position;
  self.rotation = 0;

  self.size = Point.from(window.LayersDef[def.gfx].size);
  self.halfSize = self.size.mul(.5);

  def.onInit(self);

  /**
   * @param {number} dt
   * @return {void}
   * */
  self.Update = function(dt) {
    def.onUpdate(self, dt);
  };

  /**
   * @param {CanvasRenderingContext2D[]} ctxs
   * @return {void}
   * */
  self.Render = function(ctxs) {
    var ctx;
    for(var layer = 0;layer < ctxs.length; layer++) {
      ctx = ctxs[layer];

      ctx.save();
      ctx.translate(self.position.x + self.halfSize.x, self.position.y + self.halfSize.y);
      ctx.rotate(self.rotation * DEG_TO_RAD);
      ctx.translate(-self.halfSize.x, -self.halfSize.y);

      def.onRender(self, ctx, layer);

      ctx.restore();
    }
  };
}

/**
 * @static
 * @param {string} type
 * @param {EntityDefOptionals} [modifiers]
 * @param {number} [priority]
 * @return {Entity}
 * */
Entity.new = function(type, modifiers, priority) {
  (modifiers = modifiers || {}).__proto__ = Entity.types[type];
  return EntityManager.Add(new Entity(modifiers), priority);
};

/**
 * @static
 * @type {Object.<string, EntityDef>}
 * @const
 * */
Entity.types = {
  "human": {
    gfx: "human",
    position: Point.zero(),
    onInit: function(entity) {
      entity.speed = 150;
      entity.left = Point.left();
      entity.down = Point.down();
      entity.dir = Point.zero();
    },
    onUpdate: function(entity, dt) {
      var s = entity.speed * dt, v, h;

      v = h = 0;

      if(Keyboard.Keys[Keyboard.Key.Up] >= Keyboard.State.Pressed) {
        entity.position = entity.position.sub(entity.down.mul(s));
        if(!v) {v = 1; entity.dir.y = 0}
        entity.dir.y -= 1;
      }
      if(Keyboard.Keys[Keyboard.Key.Down] >= Keyboard.State.Pressed) {
        entity.position = entity.position.add(entity.down.mul(s));
        if(!v) {v = 1; entity.dir.y = 0}
        entity.dir.y += 1;
      }
      if(Keyboard.Keys[Keyboard.Key.Left] >= Keyboard.State.Pressed) {
        entity.position = entity.position.sub(entity.left.mul(s));
        if(!h) {h = 1; entity.dir.x = 0}
        entity.dir.x -= 1;
      }
      if(Keyboard.Keys[Keyboard.Key.Right] >= Keyboard.State.Pressed) {
        entity.position = entity.position.add(entity.left.mul(s));
        if(!h) {h = 1; entity.dir.x = 0}
        entity.dir.x += 1;
      }

      if(v !== h) {
        if(!v) entity.dir.y = 0;
        if(!h) entity.dir.x = 0;
      }

      entity.rotation = entity.dir.angle() * RAD_TO_DEG + 90;
    },
    onRender: function(entity, ctx, layer) {
      Layers[entity._def.gfx][layer] && ctx.drawImage(
        Layers[entity._def.gfx][layer],
        0, // TODO: modify this offset to support animations
        0,
        entity.size.x,
        entity.size.y,
        0,
        0,
        entity.size.x,
        entity.size.y
      );
    }
  }
};