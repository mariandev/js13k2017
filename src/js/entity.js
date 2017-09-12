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

  self.id = Entity.id++;

  /** @private */
  self._def = def;

  self.position = def.position;
  self.rotation = 0;

  self.size = Point.from(window.LayersDef[def.gfx].size);
  self.halfSize = self.size.mul(.5);

  def.onInit && def.onInit(self);

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
 * @type {number}
 * */
Entity.id = 0;

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

      entity.injured = 0;

      entity.getBB = function() {
        return {
          x: entity.position.x + 16,
          y: entity.position.y + 16,
          w: TILE_SIZE - 16 * 2,
          h: TILE_SIZE - 16 * 2
        };
      };
    },
    onUpdate: function(entity, dt) {
      var s = (entity.speed - entity.injured * 50) * dt, v, h;

      v = h = 0;

      var newPosV = Point.zero();
      var newPosH = Point.zero();
      var newPos = entity.position;

      if(Keyboard.Keys[Keyboard.Key.Up] >= Keyboard.State.Pressed) {
        newPosV = newPosV.sub(entity.down.mul(s));
        if(!v) {v = 1; entity.dir.y = 0}
        entity.dir.y -= 1;
      }
      if(Keyboard.Keys[Keyboard.Key.Down] >= Keyboard.State.Pressed) {
        newPosV = newPosV.add(entity.down.mul(s));
        if(!v) {v = 1; entity.dir.y = 0}
        entity.dir.y += 1;
      }
      if(Keyboard.Keys[Keyboard.Key.Left] >= Keyboard.State.Pressed) {
        newPosH = newPosH.sub(entity.left.mul(s));
        if(!h) {h = 1; entity.dir.x = 0}
        entity.dir.x -= 1;
      }
      if(Keyboard.Keys[Keyboard.Key.Right] >= Keyboard.State.Pressed) {
        newPosH = newPosH.add(entity.left.mul(s));
        if (!h) {
          h = 1;
          entity.dir.x = 0
        }
        entity.dir.x += 1;
      }

      if(!Physics.CollidesWith(
          "map",
          newPosV.x + 16 + entity.position.x,
          newPosV.y + 16 + entity.position.y,
          TILE_SIZE - 16 * 2,
          TILE_SIZE - 16 * 2
        )) {
        newPos = newPos.add(newPosV);
      }

      if(!Physics.CollidesWith(
          "map",
          newPosH.x + 16 + entity.position.x,
          newPosH.y + 16 + entity.position.y,
          TILE_SIZE - 16 * 2,
          TILE_SIZE - 16 * 2
        )) {
        newPos = newPos.add(newPosH);
      }

      entity.position = newPos;

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
  },
  crystal: {
    gfx: "crystal",
    position: Point.zero(),
    onInit: function(entity) {
      entity.offset = 0;
      entity.offsetHelperAngle = 0;
    },
    onUpdate: function(entity, dt) {
      entity.rotation += 50 * dt;

      entity.offsetHelperAngle += 100 * dt;
      entity.offset = Math.round(Math.abs(Math.sin(entity.offsetHelperAngle * DEG_TO_RAD) * 3));
    },
    onRender: function(entity, ctx, layer) {
      layer -= entity.offset;

      if(layer < 0) return;

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
  },
  trap: {
    gfx: "trap",
    position: Point.zero(),
    onInit: function(entity) {
      entity.triggered = false
    },
    onUpdate: function(entity, dt) {
      var bb = PLAYER.getBB();

      if(!entity.triggered && Physics.Collide(
        bb.x, bb.y, bb.w, bb.h,
        entity.position.x + 16,
        entity.position.y + 16,
        TILE_SIZE - 16 * 2,
        TILE_SIZE - 16 * 2
      )) {
        entity.triggered = true;
        PLAYER.injured++;
      }
    },
    onRender: function(entity, ctx, layer) {
      !layer && ctx.drawImage(
        Layers[entity._def.gfx][entity.triggered ? 1 : 0],
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