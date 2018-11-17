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
var BAR_HEIGHT = 150;
var MY_BAR_COLOR = 'rgba(255, 0, 0, 1)';
var DIAGRAMM_LEFT_OFFSET = (CLOUD_WIDTH - 3 * BAR_GAP - 4 * BAR_WIDTH) / 2;
var DIAGRAMM_BOTTOM_OFFSET = 25;

function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

function randomAlphaCanal() {
  return randomInteger(20, 100) / 100;
};

var getMaxElement = function(arr) {
  if (arr.length === 0) {
    return 'Массив пустой';
  }
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

function renderCloud(ctx, x, y, color) {
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
};

function renderText(ctx, text, color, x, y) {
  ctx.fillStyle = color;
  ctx.font = FONT;
  ctx.textBaseline = 'hanging';
  ctx.fillText(text, x, y);
};

function renderLabel(ctx, names, i) {
  ctx.fillStyle = '#000';
  ctx.fillText(names[i], CLOUD_POSITION_X + DIAGRAMM_LEFT_OFFSET + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - DIAGRAMM_BOTTOM_OFFSET);
};

function renderTime(ctx, times, i, top) {
  var time = Math.round(times[i]);
  ctx.fillStyle = '#000';
  ctx.fillText(time, CLOUD_POSITION_X + DIAGRAMM_LEFT_OFFSET + (BAR_WIDTH + BAR_GAP) * i, top - 20);
};

function renderColumn(ctx, times, i, maxTime) {
  var left = CLOUD_POSITION_X + DIAGRAMM_LEFT_OFFSET + (BAR_WIDTH + BAR_GAP) * i;
  var top = CLOUD_HEIGHT - DIAGRAMM_BOTTOM_OFFSET - BAR_HEIGHT * times[i] / maxTime - 5;
  ctx.fillRect(left, top, BAR_WIDTH, BAR_HEIGHT * times[i] / maxTime);
  return top;
};

function calcColor(ctx, names, i) {
  var barColor = 'rgba(0, 0, 255, ' + randomAlphaCanal().toString() + ')';
  ctx.fillStyle = barColor;
  if (names[i].toLowerCase() === 'вы') {
    ctx.fillStyle = MY_BAR_COLOR;
  }
};

window.renderStatistics = function(ctx, names, times) {
  renderCloud(ctx, SHADOW_POSITION_X, SHADOW_POSITION_Y, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_POSITION_X, CLOUD_POSITION_Y, '#fff');

  renderText(ctx, 'Ура!!! Вы победили!!!', 'red', TEXT_POSITION_X, TEXT_POSITION_Y);
  renderText(ctx, 'Список результатов:', 'green', TEXT_POSITION_X, TEXT_POSITION_Y + LINE_HEIGHT);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    renderLabel(ctx, names, i);
    calcColor(ctx, names, i);
    var barTop = renderColumn(ctx, times, i, maxTime);
    renderTime(ctx, times, i, barTop);
  }
};
