export const rAF = (window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    return window.setTimeout(callback, 1000 / 60);
  }).bind(window);

export function isString(str) {
  return typeof str === 'string';
}

export function isFunction(func) {
  return typeof func === 'function';
}

export function isDepsChanged(x, y) {
  if (x === undefined && y === undefined) {
    // undefined undefined
    return true;
  } else if (objectIs(x, y)) {
    // deps, deps
    return false;
  } else if (!x || !y || x.length !== y.length) {
    // undefined, [1]
    // [], [1]
    return true;
  } else {
    // [1, 2], [1, 3]
    let changed = false;
    x.some((dep, i) => (changed = !objectIs(dep, y[i])));
    return changed;
  }
}

export function objectIs(x, y) {
  return Object.is ? Object.is(x, y) : (
    (x === y && (x !== 0 || 1 / x === 1 / y)) ||
    (x !== x && y !== y)
  );
}
