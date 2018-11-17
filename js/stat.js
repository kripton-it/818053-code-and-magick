'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_POSITION_X = 100;
var CLOUD_POSITION_Y = 10;
var CLOUD_SHADOW_OFFSET_X = 10;
var CLOUD_SHADOW_OFFSET_Y = 10;
var SHADOW_POSITION_X = CLOUD_POSITION_X + CLOUD_SHADOW_OFFSET_X;
var SHADOW_POSITION_Y = CLOUD_POSITION_Y + CLOUD_SHADOW_OFFSET_Y;

function renderCloud(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

window.renderStatistics = function(ctx, names, times) {
  // тень
  renderCloud(ctx, SHADOW_POSITION_X, SHADOW_POSITION_Y, 'rgba(0, 0, 0, 0.7)');
  // облако
  renderCloud(ctx, CLOUD_POSITION_X, CLOUD_POSITION_Y, '#fff');
};
