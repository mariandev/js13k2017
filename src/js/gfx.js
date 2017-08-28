var GFX_COLOR_TABLE = {
  "a": "038|038|038|255",
  "b": "061|025|006|255",
  "c": "000|000|000|000",
  "d": "082|034|009|255",
  "e": "105|043|011|255",
  "f": "154|120|017|255",
  "g": "161|140|077|255",
  "h": "109|145|185|255",
  "i": "179|140|020|255"
};

var GFX = {
  tiles: {
    w: BASE_TILE_SIZE * 3,
    h: BASE_TILE_SIZE * 6,
    s: GFX_SCALE,
    canvas: null,
    ctx: null,
    pack: "a32b16a32b16a32b16a32b16a32b16a32b16a32b16a32b16a32b16a32b16a32b16a32b16a32b16a32b16a32b16a32b16c32d8e8c32d8e8c32d8e8c23f2c7d8e8c21f6c5d8e8c20f8c4d8e8c20f8c4d8e8c19f10c3d8e8c19f10c3e8d8c20f8c4e8d8c20f8c4e8d8c21f6c5e8d8c23f2c7e8d8c32e8d8c32e8d8c32e8d8c32e8d8c32e8d8c32e8d8c32e8d8c32e8d8c23g2c7e8d8c22g4c6e8d8c21g6c5e8d8c21g6c5d8e8c22g4c6d8e8c23g2c7d8e8c32d8e8c32d8e8c32d8e8c32d8e8c32d8e8c263h2c45h4c43h6c42h6c43h4c45h2c430i2c44i6c41i8c40i8c39i10c38i10c39i8c40i8c41i6c44i2c935"
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