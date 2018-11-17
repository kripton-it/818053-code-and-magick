'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_POSITION_X = 100;
var CLOUD_POSITION_Y = 10;
var CLOUD_SHADOW_OFFSET_X = 10;
var CLOUD_SHADOW_OFFSET_Y = 10;
var SHADOW_POSITION_X = CLOUD_POSITION_X + CLOUD_SHADOW_OFFSET_X;
var SHADOW_POSITION_Y = CLOUD_POSITION_Y + CLOUD_SHADOW_OFFSET_Y;
var FONT = '16px PT Mono';
var TEXT_POSITION_X = 230;
var TEXT_POSITION_Y = 30;
var LINE_HEIGHT = 20;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var STATISTIC_HEIGHT = 150;
var MY_BAR_COLOR = 'rgba(255, 0, 0, 1)';

function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

function randomAlphaCanal() {
  return randomInteger(20, 80) / 100;
};

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

function renderText(ctx, text, color, x, y) {
  ctx.fillStyle = color;
  ctx.font = FONT;
  ctx.textBaseline = 'hanging';
  ctx.fillText(text, x, y);
};

function renderLabel(ctx, names, i) {
  ctx.fillText(names[i], CLOUD_POSITION_X + 20 + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - 30);
};

function renderColumn(ctx, i) {
  ctx.fillRect(CLOUD_POSITION_X + 20 + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - 40 - STATISTIC_HEIGHT, BAR_WIDTH, STATISTIC_HEIGHT);
};

function calcColor(ctx, names, i) {
  var barColor = 'rgba(0, 0, 255, ' + randomAlphaCanal().toString() + ')';
  ctx.fillStyle = barColor;
  if (names[i].toLowerCase() === 'вы') {
    ctx.fillStyle = MY_BAR_COLOR;
  }
};

window.renderStatistics = function(ctx, names, times) {
  // тень
  renderCloud(ctx, SHADOW_POSITION_X, SHADOW_POSITION_Y, 'rgba(0, 0, 0, 0.7)');
  // облако
  renderCloud(ctx, CLOUD_POSITION_X, CLOUD_POSITION_Y, '#fff');

  renderText(ctx, 'Ура!!! Вы победили!!!', 'red', TEXT_POSITION_X, TEXT_POSITION_Y);
  renderText(ctx, 'Список результатов:', 'green', TEXT_POSITION_X, TEXT_POSITION_Y + LINE_HEIGHT);

  for (var i = 0; i < names.length; i++) {
    calcColor(ctx, names, i);
    renderLabel(ctx, names, i);
    renderColumn(ctx, i);
  }
};
