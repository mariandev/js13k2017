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
  return Math.abs(v) / v;
}