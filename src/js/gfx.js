window.GFX_COLOR_TABLE = {
  "a": "038|038|038|255",
  "b": "000|000|000|000",
  "c": "003|002|002|255",
  "d": "006|005|004|255",
  "e": "106|075|059|255",
  "f": "127|127|127|255",
  "g": "093|093|093|255",
  "h": "059|059|059|255",
  "i": "058|057|039|255",
  "j": "074|181|101|255",
  "k": "206|180|145|255",
  "l": "173|170|131|255",
  "m": "154|149|101|255",
  "n": "106|075|059|254",
  "o": "059|145|081|255",
  "p": "059|046|039|255",
  "q": "052|041|035|255",
  "r": "046|036|030|255",
  "s": "040|031|026|255",
  "t": "034|026|022|255",
  "u": "028|022|018|255",
  "v": "091|159|173|255",
  "w": "059|108|118|255",
  "x": "009|007|006|255",
  "y": "015|012|010|255",
  "z": "021|017|014|255",
  "A": "027|021|018|255",
  "B": "034|026|023|255",
  "C": "040|031|027|255",
  "D": "046|035|031|255",
  "E": "052|040|035|255",
  "F": "058|045|039|255",
  "G": "046|036|031|255",

  "H": "000|000|000|000", // a
  "I": "255|255|255|019", // b
  "J": "255|255|255|064", // c
  "K": "255|255|255|090", // d
  "L": "255|255|255|116", // e
  "M": "255|255|255|001", // f
  "N": "255|255|255|056", // g
  "O": "255|255|255|123", // h
  "P": "255|255|255|127", // i
  "Q": "255|255|255|091", // j
  "R": "255|255|255|055", // k
  "S": "255|255|255|063", // l
  "T": "255|255|255|089", // m
  "U": "255|255|255|115" //  n
};

window.GFX = {
  "tiles": {
    "w": BASE_TILE_SIZE * 9,
    "h": BASE_TILE_SIZE * 10,
    "s": GFX_SCALE,
    "canvas": null,
    "ctx": null,
    "pack": "a16b16c32d4e12b48c16a16b16c32d4e12b7e3b38c16a16b16c32d4e12b5e9b34c16a16b5fb4fb5c32d4e12b5e10b33c16a16b6g4b6e16c4e27b5e11b33c16a16b3fbgbh2bgbfb3e16c4e26b5e11b8i4b22c16a16b4gb2h2b2gb4e16c4e25b6e11b7i6b21c16a16b4gb2h2b2gb4e16c4e25b6e11b7i6b12j2b7c16a16b4gb2h2b2gb4e16c4e26b4e12b7i6b12j2b7c16a16b4gb2h2b2gb4e16c4e26b4e11b9i4b22c16a16b3fbgbh2bgbfb3e16c4e26b4e11b35c16a16b6g4b6e16c4e25b6e9b36c16a16b5fb4fb5e16c4e23b10e7b36c16a16b16e16c4e22b15e3b36c16a16b16e10b3e3c4e20b56c16a16b16eb4e4b6ec4e17b59c16b32c32d4e11b97c32d4e11b97c32d4e11b97c32d4e11b8e5b75g2b7e16c4e27b8e6b73gf2gb6e16c4e27b7e7b9k4b60fbgfb6e16c4e27b6e8b8k6b12j2b45fgbfb6e16c4e26b8e6b9k6b11j4b44fbgfb6e16c4e26b8e5b10k6b11j4b44fgbfb6e16c4e24b9e6b11k4b13j2b45gf2gb6e16c4e24b9e6b76g2b7e16c4e22b14e2b86e10be5c4e18b106e2b2e5b4e3c4e18b106eb4e3b8c4e12b128c4e10b114c32d4e10b98c32d4e10b98c32d4e10b98c32d4e10b98e16c4e25b12eb86e16c4e23b13e3b11l4b13j2b55e16c4e22b13e4b8l3m4l3b9j4b54e16c4e22b13e3b8lmlm6lmlb7j6b53e16c4e23b12e3b8lmlm6lmlb7j6b53e16c4e23b13e2b9l10b9j4b54e16c4e23b44j2b55e6b3ne6c4e21b103e2b2eb6e5c4e21b103eb12e3c4e16b2e2b120c4e10b130c4e10b114c32d4e7b101c32d4e7b101c32d4e7b101c32d4e7b101e16c4e22b102e16c4e21b103e16c4e21b15e2b11l6b69e16c4e19b16e3b10lm6lb11o2b55e16c4e19b17e2b11l6b12o2b55e2b3e11c4e19b105e2b3e11c4e18b115e7c4e11be5b118e5c4e10b2e5b123c4e10b130c4e9b131c4e9b115c32d4e5b103c32d4e5b14p3b86c32d4e4b13p2q3p4b82c32d4e3b14pqr3q4pb81e16c4e19b13pqrs3r3qpb81e16c4e18b13pqrst3srqpb82e16c4e17b14pqrstutsrqpb6v2b4v2b11o2b55e16c4e16b15pqrstutsrqpb5vw2vb2vw2vb9o4b54e2b4e9bc4e11b19pqrst4srqpb5vw2vb2vw2vb9o4b61e5b4c4e8b22pqrs5rqpb7v2b4v2b11o2b71c4e6b24pq2r4srqpb99c4e7b24p2q4rqpb100c4e7b26p4q2pb100c4e6b31p3b100c4e4b136c4e4b120c39xyzABCDEFb96c39xyzABCDEFb96c39xyzABCDEFb96c39xyzABCDEFb7p5b84c38xyzABCDEFb8pq4pb83c37xyzABCDEFb8pqr3qpb26o2b55c36xyzABCDEFb8pqrs2rqpb7v8b10o4b54x16c15x6yzABCDEFb9pqr2qpb7vw8vb8o6b53y16c14xy6z3ABCDEFb8pqrqpb8vw8vb8o6b53z16c13xyz6A3B2CDEFb7pq2rqpb9v8b10o4b54u16c12xyzuA5B3C2DE2Fb7p3q2pb28o2b55t16c11xyzutB5C3D2EF2b11p2b86s16c10xyzutC6D3E2Fb101r16c9xyzutCGD5E3F2b102q10b3q3c8xyzutCGqE5F3b104pb4p4b6pc7xyzutCGqpF5b107c38xyzutsrqFb97c38xyzutsrqFb97c38xyzutsrqFb97c38xyzutsrqFb97c38xyzutsrqFb10pb86c37xy2zutsrqFb9pqpb85x16c14x7yz3utsrqFb8pq2pb85y16c13xy7zu4tsrqb9pqpb86z16c12xyz7ut4srq2b9pqpb86u16c11xyzu7ts4rqb12p2b86t16c10xyzut7sr4q2b100s16c9xyzutC2s5rq4b102r10br5c8xyzutCG2r5qb106q2b2q5b4q3c7xyzutCGq8b106pb4p3b8c6xyzutCGqp2b128c6xyzutCGqb114c37xyzutsrqFb98c37xyzutsrqFb98c37xyzutsrqFb98c36xyzutsrq2Fb98c35xyzutsrqF2b99x16c14x5yzutsrqFb101y16c13xy5zutsrqFb14p2b86z16c12xyz6utsrqFb13pqpb86u16c11xyzu6t3srqFb13p2b86t16c10xyzut6s2tsrqFb101s16c9xyzutC2s4r2srqF2b101r6b3r7c8xyzutCG2r4q2rqFb103q2b2qb6q5c7xyzutCGq6F2q2Fb103pb12p3c6xyzutCGqp2F4b2F2b120c5xyzutCGqpb130c5xyzutCGqpb114c36xyzutsrb101c36xyzutsrb101c35xyzu2tsrb101c34xyzut2sr2b101x16c16x2yzuts2rqb102y16c13x3y2zutsr2qb103z16c12xy3z2utsrq3b103u16c11xyz3u2tsrqFb105t16c10xyzu3t3srqFb105s2b3s11c9xyzut3s4rqFb105r2b3r11c8xyzutC3r4qFb115q7c7xyzutCG2bq4Fb118p5c6xyzutCGqb2F5b123c5xyzutCGqpb130c4xyzutCGqpb131c4xyzutCGqpb115c32dxyzutsrqb103x16c10x8yzutsrqb103y16c9xy8zutsrqb104z16c8xyz8utsrqb105u16c7xyzu9tsrqb105t16c6xyzut9srqb106s16c5xyzutC6s3rqb107r16c4xyzutCG6r3qb108q2b4q9bc3xyzutCGq6b119p5b4c2xyzutCGqp2b132cxyzutCGqpb134cxyzutsrqp2b133cxyzutsrqp2b133cxyzutCGqpb134cxyzutCGb136cxyzutCGb88"
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