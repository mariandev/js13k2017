window.GFX_COLOR_TABLE = {
  "a": "038|038|038|255",
  "b": "000|000|000|000",
  "c": "003|002|002|255",
  "d": "106|075|059|255",
  "e": "059|046|039|255",
  "f": "040|031|026|255",
  "g": "028|022|018|255",
  "h": "058|057|039|255",
  "i": "206|180|145|255",
  "j": "173|170|131|255",
  "k": "154|149|101|255",
  "l": "106|075|059|254",
  "m": "052|041|035|255",
  "n": "046|036|030|255",
  "o": "034|026|022|255",
  "p": "059|108|118|255",
  "q": "009|007|006|255",
  "r": "015|012|010|255",
  "s": "021|017|014|255",
  "t": "040|031|027|255",
  "u": "046|036|031|255"
};

window.GFX = {
  "tiles": {
    "w": BASE_TILE_SIZE * 6,
    "h": BASE_TILE_SIZE * 10,
    "s": GFX_SCALE,
    "canvas": null,
    "ctx": null,
    "pack": "a16b16c32b32a16b16c32b7d3b22a16b16c32b5d9b18a16b5eb4eb5c32b5d10b17a16b6f4b6d16c4d12b4d11b17a16b3ebfbg2bfbeb3d16c4d12b3d11b8h4b6a16b4fb2g2b2fb4d16c4d12b3d11b7h6b5a16b4fb2g2b2fb4d16c4d12b3d11b7h6b5a16b4fb2g2b2fb4d16c4d12b2d12b7h6b5a16b4fb2g2b2fb4d16c4d12b2d11b9h4b6a16b3ebfbg2bfbeb3d16c4d12b2d11b19a16b6f4b6d16c4d12b3d9b20a16b5eb4eb5d16c4d12b5d7b20a16b16d16c4d12b9d3b20a16b16d10b3d3c4d12b32a16b16db4d4b6dc4d12b64c32b64c32b64c32b64c32b7d5b43f2b7d16c4d12b7d6b41fe2fb6d16c4d12b6d7b9i4b28ebfeb6d16c4d12b5d8b8i6b27efbeb6d16c4d12b6d6b9i6b27ebfeb6d16c4d12b6d5b10i6b27efbeb6d16c4d12b5d6b11i4b28fe2fb6d16c4d12b5d6b44f2b7d16c4d12b8d2b54d10bd5c4d12b64d2b2d5b4d3c4d12b64db4d3b8c4d12b80c4d10b66c32b64c32b64c32b64c32b64d16c4d12b9db54d16c4d12b8d3b11j4b38d16c4d12b7d4b9j2k4j2b36d16c4d12b7d3b9jk8jb35d16c4d12b7d3b9jk8jb35d16c4d12b8d2b10j8b36d16c4d12b64d6b3ld6c4d12b64d2b2db6d5c4d12b64db12d3c4d12b80c4d10b82c4d10b66c32b64c32b64c32b64c32b64d16c4d12b64d16c4d12b64d16c4d12b8d2b11j6b37d16c4d12b7d3b10jk6jb36d16c4d12b8d2b11j6b37d2b3d11c4d12b64d2b3d11c4d12b73d7c4d11b76d5c4d10b82c4d10b82c4d9b83c4d9b67c32b64c32b7e3b54c32b5e2m3e4b50c32b5emn3m4eb49d16c4d12b4emnf3n3meb49d16c4d12b3emnfo3fnmeb50d16c4d12b3emnfogofnmeb6p2b4p2b36d16c4d12b3emnfogofnmeb5p4b2p4b35d2b4d9bc4d11b3emnfo4fnmeb5p4b2p4b42d5b4c4d8b6emnf5nmeb7p2b4p2b52c4d6b8em2n4fnmeb67c4d7b8e2m4nmeb68c4d7b10e4m2eb68c4d6b15e3b68c4d4b88c4d4b72c32b64c32b64c32b64c32b7e5b52c32b7em4eb51c32b6emn3meb51c32b5emnf2nmeb7p8b36q16c15qb6emn2meb7p10b35r16c14qrb6emnmeb8p10b35s16c13qrsb5em2nmeb9p8b36g16c12qrsgb5e3m2eb53o16c11qrsgob8e2b54f16c10qrsgotb64n16c9qrsgotub64m10b3m3c8qrsgotumb64eb4e4b6ec7qrsgotumeb64c32b64c32b64c32b64c32b64c32b9eb54c32b8emeb53q16c14q2b7em2eb53r16c13qr2b7emeb54s16c12qrs2b7emeb54g16c11qrsg2b8e2b54o16c10qrsgo2b64f16c9qrsgot2b64n10bn5c8qrsgotu2b64m2b2m5b4m3c7qrsgotum2b64eb4e3b8c6qrsgotume2b80c6qrsgotumb66c32b64c32b64c32b64c32b64c32b64q16c14q2b64r16c13qr2b8e2b54s16c12qrs2b7emeb54g16c11qrsg2b8e2b54o16c10qrsgo2b64f16c9qrsgot2b64n6b3n7c8qrsgotu2b64m2b2mb6m5c7qrsgotum2b64eb12e3c6qrsgotume2b80c5qrsgotumeb82c5qrsgotumeb66c32b64c32b64c32b64c32b64q16c16b64r16c13q3b64s16c12qr3b64g16c11qrs3b64o16c10qrsg3b64f2b3f11c9qrsgo3b64n2b3n11c8qrsgot3b73m7c7qrsgotu2b76e5c6qrsgotumb82c5qrsgotumeb82c4qrsgotumeb83c4qrsgotumeb67c32b64q16c10q6b64r16c9qr6b64s16c8qrs6b64g16c7qrsg6b64o16c6qrsgo6b64f16c5qrsgot6b64n16c4qrsgotu6b64m2b4m9bc3qrsgotum6b71e5b4c2qrsgotume2b84cqrsgotumeb86c2qrsgotumeb85c2qrsgotumeb85cqrsgotumeb86cqrsgotub88cqrsgotub40"
  }
};

window.GFX_unpackColorTable = function() {
  Object.keys(window.GFX_COLOR_TABLE).forEach(function(label) {
    window.GFX_COLOR_TABLE[label] = window.GFX_COLOR_TABLE[label]
      .split("|")
      .map(function(s) {
        return parseInt(s);
      });
  });
};

window.GFX_unpackGFX = function(cb) {
  window.GFX_unpackColorTable();

  Object.keys(window.GFX).forEach(function(g) {
    var gfx = window.GFX[g];
    gfx.ctx = (gfx.canvas = get("canvas")).getContext("2d");
    gfx.canvas.webkitImageSmoothingEnabled = false;
    gfx.canvas.mozImageSmoothingEnabled = false;
    gfx.canvas.imageSmoothingEnabled = false;

    gfx.s = gfx.s || 1;
    gfx.canvas.width = (gfx.w *= gfx.s);
    gfx.canvas.height = (gfx.h *= gfx.s);

    if(gfx.pack) {

      var m = [];
      Array.prototype.forEach.call(Magnifier(Decoder(gfx.pack), gfx.w / gfx.s, gfx.s), function(c, i) {
        //if(c === "g") console.log(i, i % (BASE_TILE_SIZE * 6), i / (BASE_TILE_SIZE * 6));
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