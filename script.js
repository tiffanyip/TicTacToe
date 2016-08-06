restart = function(){
  location.reload();
}

$(document).ready(function(){
  $('.cells').on('click', function(e){
    var id = e.target.id;
    var pos = id.substr(id.length - 1);
    if(!game.board[pos-1]){
      if(game.p1Turn){
        document.getElementById(id).innerHTML ="<p>X</p>";
        game.board[pos-1] = 1;
        game.p1Clicks[pos-1] = 1;
        game.p1Turn = false;
        document.getElementById("playerTurn").innerHTML = 2;
      }
      else{
        document.getElementById(id).innerHTML ="<p>O</p>";
        game.board[pos-1] = 1;
        game.p2Clicks[pos-1] = 1;
        game.p1Turn = true;
        document.getElementById("playerTurn").innerHTML = 1;
      }
      game.determineWinner();
    }
  });
  $("#reset").on('click', function() {
    game.reset();
  });
});


function Game(){
  this.p1Turn = true;
  this.p1Clicks = Array(9).fill(0);
  this.p2Clicks = Array(9).fill(0);
  this.board = Array(9).fill(0);
  this.p1Score = 0;
  this.p2Score = 0;
  this.endRound = false;
}
Game.prototype.determineWinner = function(){
  //check row, col, diagonal
  var announceWinner = "";
  if(this.p1Clicks[0] + this.p1Clicks[1] + this.p1Clicks[2] == 3 || this.p1Clicks[3] + this.p1Clicks[4] + this.p1Clicks[5] == 3|| this.p1Clicks[6] + this.p1Clicks[7] + this.p1Clicks[8] == 3 || this.p1Clicks[0] + this.p1Clicks[4] + this.p1Clicks[8] == 3 || this.p1Clicks[2] + this.p1Clicks[4] + this.p1Clicks[6] == 3 || this.p1Clicks[0] + this.p1Clicks[3] + this.p1Clicks[6] == 3 || this.p1Clicks[1] + this.p1Clicks[4] + this.p1Clicks[7] == 3|| this.p1Clicks[2] + this.p1Clicks[5] + this.p1Clicks[8] == 3){
    this.p1Score++;
    this.endRound = true;
    announceWinner = "Player 1 wins!"
  }
  if(this.p2Clicks[0] + this.p2Clicks[1] + this.p2Clicks[2] == 3 || this.p2Clicks[3] + this.p2Clicks[4] + this.p2Clicks[5] == 3|| this.p2Clicks[6] + this.p2Clicks[7] + this.p2Clicks[8] == 3 || this.p2Clicks[0] + this.p2Clicks[4] + this.p2Clicks[8] == 3 || this.p2Clicks[2] + this.p2Clicks[4] + this.p2Clicks[6] == 3 || this.p2Clicks[0] + this.p2Clicks[3] + this.p2Clicks[6] == 3 || this.p2Clicks[1] + this.p2Clicks[4] + this.p2Clicks[7] == 3|| this.p2Clicks[2] + this.p2Clicks[5] + this.p2Clicks[8] == 3){
    this.p2Score++;
    this.endRound = true;
    announceWinner = "Player 2 wins!"
  }
  //if no one wins, end the round
  if(this.board.reduce( (prev, curr) => prev + curr ) === 9){
    this.endRound = true;
  }
  //update scoreboard
  if(this.endRound){
    var announce = '<p id="winner">' + announceWinner + "</p>";
    $(".container").prepend(announce);
    this.reset();
    $("#winner").delay(3000).queue(function (next) {
        $(this).remove();
        next();
      });
    $("#board").hide().delay(3000).queue(function (next) {
          $(this).show();
          next();
    });
    $(".turn").hide().delay(3000).queue(function (next) {
          $(this).show();
          next();
    });

  }
}
Game.prototype.reset = function(){
  document.getElementById("p1score").innerHTML = this.p1Score;
  document.getElementById("p2score").innerHTML = this.p2Score;
  var allCells = document.getElementsByClassName("cells");
  for(var i = 0; i < allCells.length; i++){
    allCells[i].innerHTML = "";
  }
  //reset board elements
  document.getElementById("playerTurn").innerHTML = 1;
  //can modify to determine who plays first in the next round
  this.p1Turn = true;
  this.p1Clicks = Array(9).fill(0);
  this.p2Clicks = Array(9).fill(0);
  this.board = Array(9).fill(0);
  this.endRound = false;
}

var game = new Game();
