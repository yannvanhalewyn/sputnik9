module.exports = function(modelName) {
  var params = arguments[2] || {};
  var variation = 'default';

  if (typeof arguments[1] == 'string') variation = arguments[1];
  else params = arguments[1]

  return require(`./${modelName}_factory`)[variation](params)

}
