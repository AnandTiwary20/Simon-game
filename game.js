// alert("keep it");


buttonColours=["red", "blue" , "green", "yellow"];

var gamePattern =[]

var userClickedPattern=[]

//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.

var started = false;

//2. Create a new variable called level and start at level 0.

var level = 0;

//1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().

$(document).keypress(function() {
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


function nextSequence(){

  userClickedPattern = [];

  //4. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  level++;

  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
       
$(".btn").click(function(){
        
  var  userChosenColour = $(this).attr("id");
        
  userClickedPattern.push(userChosenColour);
        
  playSound(userChosenColour);


        checkAnswer(userClickedPattern.length-1);
})

       
function playSound(name){
 var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass(".pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass(".pressed");
  }, 100);
}

function checkAnswer(currentLevel){
   //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      alert("wrong");
        
      playSound("wrong");

      
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

      startOver();

    }

}
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;

}