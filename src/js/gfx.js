var GFX_COLOR_TABLE = {
  "a": "000|000|000|000",
  "b": "105|043|011|255",
  "c": "084|084|084|255"
};

var GFX = {
  tiles: {
    w: 48,
    h: 16,
    s: 8,
    canvas: null,
    ctx: null,
    pack: "a16b16c16a16b16c16a16b16c16a16b16c16a16b16c16a16b16c16a16b16c16a16b16c16a16b16c16a16b16c16a16b16c16a16b16c16a16b16c16a16b16c16a16b16c16a16b16c16"
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

      var m = [], r = [], k, packs, idx;

      packs = gfx.pack.split(/(\w\d*)/g).filter(function(_) {return !!_});
      for(idx in packs) {
        k = (parseInt(packs[idx].substr(1)) || 1) * gfx.s;
        while(k--) {
          r = r.concat(GFX_COLOR_TABLE[packs[idx][0]]);

          if(r.length / 4 === gfx.w) {
            for(var i = 0;i < gfx.s; i++) m = m.concat(r);
            r = [];
          }
        }
      }

      try {
        gfx.ctx.putImageData(new ImageData(new Uint8ClampedArray(m), gfx.w, gfx.h), 0, 0);
      } catch(e) {
        // Last minute fix for Edge; slow as hell but it works :)
        for(var j = 0;j < m.length; j += 4) {
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