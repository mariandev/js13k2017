var GFX_COLOR_TABLE = {
  "a": "038|038|038|255",
  "b": "105|043|011|255",
  "c": "000|000|000|000",
  "d": "061|025|006|255",
  "e": "154|120|017|255",
  "f": "215|167|023|255"
};

var GFX = {
  tiles: {
    w: BASE_TILE_SIZE * 3,
    h: BASE_TILE_SIZE * 3,
    s: GFX_SCALE,
    canvas: null,
    ctx: null,
    pack: "a32b16a32b16a32b16a32b16a32b16a32b16a32b16a32b16a32b16a32b16a32b16a32b16a32b16a32b16a32b16a32b16c32d16c32d16c32d16c23e2c7d16c21e6c5d16c20e8c4d16c20e8c4d16c19e10c3d16c19e10c3d16c20e8c4d16c20e8c4d16c21e6c5d16c23e2c7d16c32d16c32d16c32d16c263f2c45f4c43f6c42f6c43f4c45f2c263"
  }
};

GFX.unpackColorTable = function() {
  Object.keys(GFX_COLOR_TABLE).forEach(function(label) {
    GFX_COLOR_TABLE[label] = GFX_COLOR_TABLE[label].split("|").map(function(s) {return parseInt(s);});
  });
};

GFX.unpackGFX = function(cb) {
  GFX.unpackColorTable();

  Object.keys(GFX).forEach(function(g) {
    var gfx = GFX[g];
    gfx.ctx = (gfx.canvas = document.createElement("canvas")).getContext("2d");
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