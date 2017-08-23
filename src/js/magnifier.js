/**
 * @param {string} data
 * @param {number} rowSize
 * @param {number} scale
 * @return {string}
 */
function Magnifier(data, rowSize, scale) {
  var a = new Array(scale + 1);
  return data
    .split(new RegExp("(.{" + rowSize + "})", "g"))
    .map(function(row) {
      row = row
        .split("")
        .map(function(c) {
          return a.join(c);
        })
        .join("");
      return a.join(row);
    })
    .join("");
}