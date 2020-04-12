function randBool() {
  let x = random(0, 2);
  if (x < 1)
    return true;
  else
    return false;
}
function randInt(a, b) {
  // Returns a random int n such that a <= n < b
  return floor(random(a, b));
}

function copyArray(currentArray) {
  const len = currentArray.length;
  var newArray = new Array(len);

  for (var i = 0; i < len; i++)
      newArray[i] = currentArray[i].slice(0);
  return currentArray;
}
