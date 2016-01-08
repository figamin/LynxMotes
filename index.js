//Adds the css class orangeText if user posts <text

'use strict';

var common = require('../../engine/postingOps').common;

exports.engineVersion = '1.4.4';

var orangeTextFunction = function(match) {

  var content = match.substring(8);
  return '<span class="orangeText">&lt' + content + '</span>';

};

exports.init = function() {

  var originalMarkdown = common.markdownText;

  common.markdownText = function(message, board, replaceCode, callback) {

    message = message.replace(/</g, '[orange]');

    originalMarkdown(message, board, replaceCode, callback);

  };

  var originalProcessLine = common.processLine;

  common.processLine = function(split, replaceCode) {

    split = originalProcessLine(split, replaceCode);

    split = split.replace(/^\[orange\][^\&].*/g, orangeTextFunction);

    return split.replace(/\[orange\]/g, '&lt');

  };

};