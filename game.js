var buttonColours = ["red", "blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keydown(function(){
    if(!started){
        nextSequence();
        started = true;
    }
});

function nextSequence() {
    $("#level-title").text("Level " + level);
    level++;
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    $("#" + userChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed")
    },100);
}

function checkAnswer(currentIndex){

    if(gamePattern[currentIndex] === userClickedPattern[currentIndex]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }

    console.log(gamePattern);
    console.log(userClickedPattern);

}

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}

function playSound(sound) {
    var audio = new Audio("sounds/"+sound+".mp3");
    audio.play();
}

