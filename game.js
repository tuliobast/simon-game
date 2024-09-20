var userClickedPattern = [];
var buttonColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var level = 0;
var started = false;

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColor[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);  
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]=== gamePattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    wrong = new Audio("sounds/wrong.mp3")
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function() {
    $("body").removeClass("game-over")}, 2000);
    console.log("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart")
    startOver();
  } 
}

function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
  userClickedPattern = [];
}

$(document).keypress(function(e) {
  if(!started) {
    nextSequence();
    $("#level-title").text("Level " + level);
    started = true;
    console.log(e.key);
  }
});

$(".btn").on("click", function(e) {
  var userChosenColour = $(this).attr("id"); 
  userClickedPattern.push(userChosenColour); 
  playSound(userChosenColour); 
  animatePress(userChosenColour); 
  checkAnswer(userClickedPattern.length-1); 
});