'use strict';

var CLOUD_WIDTH = 500;
var CLOUD_HEIGHT = 200;

function renderCloud(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

window.renderStatistics = function(ctx, names, times) {
  // тень
  renderCloud(ctx, 110, 60, 'rgba(0, 0, 0, 0.3)');
  // облако
  renderCloud(ctx, 100, 50, '#fff');
};
