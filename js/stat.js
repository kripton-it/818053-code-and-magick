'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_POSITION_X = 100;
var CLOUD_POSITION_Y = 10;
var CLOUD_SHADOW_OFFSET_X = 10;
var CLOUD_SHADOW_OFFSET_Y = 10;
var FONT = '16px PT Mono';
var TEXT_POSITION_X = 230;
var TEXT_POSITION_Y = 30;
var LINE_HEIGHT = 20;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var BAR_HEIGHT = 150;
var MY_BAR_COLOR = 'rgba(255, 0, 0, 1)';
var DIAGRAMM_LEFT_OFFSET = (CLOUD_WIDTH - 3 * BAR_GAP - 4 * BAR_WIDTH) / 2;
var DIAGRAMM_BOTTOM_OFFSET = 25;

function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

function randomAlphaCanal() {
  return randomInteger(20, 100) / 100;
}

function getMaxElement(arr) {
  if (arr.length === 0) {
    return null;
  }
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
}

function renderShape(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + CLOUD_WIDTH / 2, y + 10);
  ctx.lineTo(x + CLOUD_WIDTH, y);
  ctx.lineTo(x + CLOUD_WIDTH + 10, y + CLOUD_HEIGHT / 2);
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT);
  ctx.lineTo(x + CLOUD_WIDTH / 2, y + CLOUD_HEIGHT - 10);
  ctx.lineTo(x, y + CLOUD_HEIGHT);
  ctx.lineTo(x - 10, y + CLOUD_HEIGHT / 2);
  ctx.closePath();
  ctx.fill();
}

function renderCloud(ctx) {
  var shadowX = CLOUD_POSITION_X + CLOUD_SHADOW_OFFSET_X;
  var shadowY = CLOUD_POSITION_Y + CLOUD_SHADOW_OFFSET_Y;
  renderShape(ctx, shadowX, shadowY, 'rgba(0, 0, 0, 0.7)');
  renderShape(ctx, CLOUD_POSITION_X, CLOUD_POSITION_Y, '#fff');
}

function renderText(ctx, text, color, x, y) {
  ctx.fillStyle = color;
  ctx.font = FONT;
  ctx.textBaseline = 'hanging';
  ctx.fillText(text, x, y);
}

function renderLabel(ctx, x, y, name, color) {
  ctx.fillStyle = color;
  //ctx.fillText(name, x, CLOUD_HEIGHT - DIAGRAMM_BOTTOM_OFFSET);
  ctx.fillText(name, x, y);
}

function renderTime(ctx, x, y, time, color) {
  ctx.fillStyle = color;
  //ctx.fillText(time, CLOUD_POSITION_X + DIAGRAMM_LEFT_OFFSET + (BAR_WIDTH + BAR_GAP) * i, top - 20);
  ctx.fillText(time, x, y);
}

function renderColumn(ctx, x, y, height, color) {
  //var left = CLOUD_POSITION_X + DIAGRAMM_LEFT_OFFSET + (BAR_WIDTH + BAR_GAP) * i;
  //var top = CLOUD_HEIGHT - DIAGRAMM_BOTTOM_OFFSET - BAR_HEIGHT * times[i] / maxTime - 5;
  ctx.fillStyle = color;
  ctx.fillRect(x, y, BAR_WIDTH, height);
}

function calcColor(ctx, name) {
  var barColor = 'rgba(0, 0, 255, ' + randomAlphaCanal().toString() + ')';
  if (name.toLowerCase() === 'вы') {
    barColor = MY_BAR_COLOR;
  }
  return barColor;
}

function renderPlayerResult(ctx, time, name, i, maxTime) {
  var columnHeight = BAR_HEIGHT * time / maxTime;
  var labelX = CLOUD_POSITION_X + DIAGRAMM_LEFT_OFFSET + (BAR_WIDTH + BAR_GAP) * i;
  var labelY = CLOUD_HEIGHT - DIAGRAMM_BOTTOM_OFFSET;
  renderLabel(ctx, labelX, labelY, name, '#000');
  var columnX = labelX;
  var columnY = CLOUD_HEIGHT - DIAGRAMM_BOTTOM_OFFSET - columnHeight - 5;
  var columnColor = calcColor(ctx, name);
  renderColumn(ctx, columnX, columnY, columnHeight, columnColor);
  var timeX = CLOUD_POSITION_X + DIAGRAMM_LEFT_OFFSET + (BAR_WIDTH + BAR_GAP) * i;
  var timeY = CLOUD_HEIGHT - DIAGRAMM_BOTTOM_OFFSET - BAR_HEIGHT * time / maxTime - 25;
  time = Math.round(time);
  renderTime(ctx, timeX, timeY, time, '#000');
}

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx);
  renderText(ctx, 'Ура!!! Вы победили!!!', 'red', TEXT_POSITION_X, TEXT_POSITION_Y);
  renderText(ctx, 'Список результатов:', 'green', TEXT_POSITION_X, TEXT_POSITION_Y + LINE_HEIGHT);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    renderPlayerResult(ctx, times[i], names[i], i, maxTime);
  }
};
