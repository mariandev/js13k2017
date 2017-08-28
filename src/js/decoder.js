/**
 * @param {string} packedData
 * @return {string}
 */
function Decoder(packedData) {
  return packedData
    .replace(/\s*/g, "")
    .split(/(\w\d*)/g)
    .filter(Boolean)
    .map(function(pair) {
      return new Array((parseInt(pair.substr(1)) || 1) + 1).join(pair[0]);
    })
    .join("");
}