var GFX_COLOR_TABLE = {
  "a": "038|038|038|255",
  "b": "059|046|039|255",
  "c": "000|000|000|000",
  "d": "154|120|017|255",
  "e": "106|075|059|255",
  "f": "161|140|077|255",
  "g": "109|145|185|255",
  "h": "179|140|020|255"
};

var GFX = {
  tiles: {
    w: BASE_TILE_SIZE * 5,
    h: BASE_TILE_SIZE * 6,
    s: GFX_SCALE,
    canvas: null,
    ctx: null,
    pack: "a48b16c16a48b16c16a48b16c16a48b16c16a48b16c16a48b16c16a48b16c16a48b16c16a48b16c16a48b16c16a48b16c16a48b16c16a48b16c16a48b16c16a48b16c16a48b16c48b16c64b16c64b16c55d2c7b16c53d6c5b16c52d8c4b16c52d8c4b16c51d10c3b16c51d10c3b16c52d8c4b16c52d8c4b16c53d6c5b16c55d2c7b16c64b10e3b3c64be4b4ec3e2bc64ec4e4c6ec64b16c64b16c64b16c64b16c64b16c55f2c7b16c54f4c6b16c53f6c5b16c53f6c5b16c54f4c6b16c55f2c7b16c64b16c64b10eb5c64b2e2b5ece3b2c64bec2eb3ec4e3c64ec4e3c72b16c64b16c64b16c64b16c64b16c55g2c7b16c54g4c6b16c53g6c5b16c53g6c5b16c54g4c6b16c55g2c7b16c64b16c64b6e3b7c64b2e2bec3e2b5c64bec2ec6e2b3c64ec12e3c64b16c64b16c64b16c55h2c7b16c53h6c5b16c52h8c4b16c52h8c4b16c51h10c3b16c51h10c3b16c52h8c4b16c52h8c4b16c53h6c5b2e3b11c55h2c7bec3eb10c64e2c3e4b7c73e2b5c75e5c1312"
  }
};

GFX.unpackColorTable = function() {
  Object.keys(GFX_COLOR_TABLE).forEach(function(label) {
    GFX_COLOR_TABLE[label] = GFX_COLOR_TABLE[label]
      .split("|")
      .map(function(s) {
        return parseInt(s);
      });
  });
};

GFX.unpackGFX = function(cb) {
  GFX.unpackColorTable();

  Object.keys(GFX).forEach(function(g) {
    var gfx = GFX[g];
    gfx.ctx = (gfx.canvas = get("canvas")).getContext("2d");
    gfx.canvas.webkitImageSmoothingEnabled = false;
    gfx.canvas.mozImageSmoothingEnabled = false;
    gfx.canvas.imageSmoothingEnabled = false;

    gfx.s = gfx.s || 1;
    gfx.canvas.width = (gfx.w *= gfx.s);
    gfx.canvas.height = (gfx.h *= gfx.s);

    if(gfx.pack) {

      var m = [];
      Array.prototype.forEach.call(Magnifier(Decoder(gfx.pack), gfx.w / gfx.s, gfx.s), function(c) {
        m.push.apply(m, GFX_COLOR_TABLE[c]);
      });

      try {
        gfx.ctx.putImageData(new ImageData(new Uint8ClampedArray(m), gfx.w, gfx.h), 0, 0);
      } catch(e) {
        // Last minute fix for Edge; slow as hell but it works :)
        for(var i = 0;i < m.length; i += 4) {
          gfx.ctx.beginPath();
          gfx.ctx.fillStyle = "rgba(" + m[i] + ", " + m[i+1] + ", " + m[i+2] + ", " + m[i+3] + ")";
          gfx.ctx.fillRect(Math.floor((i / 4) % gfx.w), Math.floor((i / 4) / gfx.w), 1, 1);
        }
      }
    }

    /*gfx.canvas.style.top = gfx.h + "px";
    document.body.appendChild(gfx.canvas);*/

  });

  cb();
};