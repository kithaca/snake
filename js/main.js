var View = require("./snake-view");

$(function () {
  var $board = $("#board");
  new View($board);
  console.log("created game");
});
