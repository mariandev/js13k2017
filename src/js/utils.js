/**
 * @function
 * @callback VoidCallback
 * @return {void}
 * */

/**
 * @param {number} value
 * @param {number} min
 * @return {number}
 * */
function clampLeft(value, min) {
  return value < min ? min : value;
}

/**
 * @param {number} value
 * @param {number} max
 * @return {number}
 * */
function clampRight(value, max) {
  return value > max ? max : value;
}

/**
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @return {number}
 * */
function clamp(value, min, max) {
  return value < min ? min : (value > max ? max : value);
}

/**
 * @param {number} value
 * @return {number}
 * */
function clamp01(value) {
  return clamp(value, 0, 1);
}

/**
 * @param {string} v
 * @return {Element}
 * */
function id(v) {
  return document.getElementById(v);
}

/**
 * @param {string} t
 * @return {Element}
 * */
function get(t) {
  return  document.createElement(t);
}

/**
 * @param {number} v
 * @return {number}
 * */
function sgn(v) {
  return v ? Math.abs(v) / v : 1;
}

var DEG_TO_RAD = Math.PI / 180;
var RAD_TO_DEG = 1 / DEG_TO_RAD;

/**
 * @param {Point} tile
 * @return {Point}
 * */
function tileToWorldSpace(tile) {
  return tile.mul(TILE_SIZE);
}

/**
 * @param {Point} ws
 * @return {Point}
 * */
function worldSpaceToTile(ws) {
  var t = ws.mul(1 / TILE_SIZE);
  return new Point(
    Math.floor(t.x),
    Math.floor(t.y)
  );
}