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
  // прямоугольник
  ctx.fillStyle = color;
  // ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.beginPath();
  // левый верхний угол
  ctx.moveTo(x, y);
  ctx.lineTo(x + CLOUD_WIDTH / 2, y + 10);
  // правый верхний угол
  ctx.lineTo(x + CLOUD_WIDTH, y);
  ctx.lineTo(x + CLOUD_WIDTH + 10, y + CLOUD_HEIGHT / 2);
  // правый нижний угол
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT);
  ctx.lineTo(x + CLOUD_WIDTH / 2, y + CLOUD_HEIGHT - 10);
  // левый нижний угол
  ctx.lineTo(x, y + CLOUD_HEIGHT);
  ctx.lineTo(x - 10, y + CLOUD_HEIGHT / 2);
  ctx.closePath();
  ctx.fill();
};

window.renderStatistics = function(ctx, names, times) {
  // тень
  renderCloud(ctx, SHADOW_POSITION_X, SHADOW_POSITION_Y, 'rgba(0, 0, 0, 0.7)');
  // облако
  renderCloud(ctx, CLOUD_POSITION_X, CLOUD_POSITION_Y, '#fff');
};
