const Dancer = require('./dancer');
const Notes = require('./notes');
const Song = require('./song');
const Sheet = require('./sheet');
const Feedback = require('./feedback');

document.addEventListener('DOMContentLoaded', ()=> {

  const gameCanvas = document.getElementById('gameCanvas');
  var stage = new createjs.Stage(gameCanvas);

  var background1 = new Image()
  var background2 = new Image()
  background1.src = "./assets/images/outside.png"
  background2.src = "./assets/images/fragile-soft-machine.png"
  var back1 = new createjs.Bitmap(background1);
  var back2 = new createjs.Bitmap(background2);
  back1.setTransform(0, -200, .2, .2)
  back2.setTransform(415, -170, .3, .3)
  stage.addChild(back1)
  stage.addChild(back2)


  var dancer = new Dancer(stage);
  var note = new Notes(stage)
  var feedback = new Feedback(stage)
  var sheet = new Sheet(note, feedback, stage, currentSongID)

  var song = new Song(1);
  var currentSongID = 1;

  $('#song1').click((e) => {
    currentSongID = 1;
    $('#song1').css({'background':"yellow"})
    $('#song2').css({'background':"#ccc"})
  })

  $('#song2').click((e) => {
    $('#song1').css({'background':"#ccc"})
    $('#song2').css({'background':"yellow"})
    currentSongID = 2;
  })

  $('#play').click((e) => {
    if (song.currentTime() === 0 || song.currentTime() === song.duration()){
      sheet.reset()
      song = new Song(currentSongID);
      sheet = new Sheet(note, feedback, stage, currentSongID)
      song.play()
    }else{
      song.pause()
      createjs.Ticker.paused = createjs.Ticker.paused ? false : true;
    }
  })



  $('body').on('keydown', (e)=>{
    switch (e.which) {
      case 74:
        sheet.strike(1)
        break;
      case 75:
        sheet.strike(2)
        break;
      case 76:
        sheet.strike(3)
        break;
      case 186:
        sheet.strike(4)
        break;
    }
  })

  var bar = new createjs.Shape();
  bar.graphics.beginFill("teal")
              .drawRect(460, 350, 150, 20)
  stage.addChild(bar)

  var note1 = new createjs.Shape();
  note1.graphics.beginFill("#9cdaff")
               .drawEllipse(450, 350, 25, 20)
  var char1 = new createjs.Text("J", "18px Arial", "#9cdaff")
  char1.x = 456;
  char1.y = 375;
  var note2 = new createjs.Shape();
  note2.graphics.beginFill("#c568a5")
               .drawEllipse(500, 350, 25, 20)
  var char2 = new createjs.Text("K", "18px Arial", "#c568a5")
  char2.x = 505;
  char2.y = 375;
  var note3 = new createjs.Shape();
  note3.graphics.beginFill("#ffd265")
               .drawEllipse(550, 350, 25, 20)
  var char3 = new createjs.Text("L", "18px Arial", "#ffd265")
  char3.x = 557;
  char3.y = 375;
  var note4 = new createjs.Shape();
  note4.graphics.beginFill("#bcff7c")
               .drawEllipse(600, 350, 25, 20)
  var char4 = new createjs.Text(";", "18px Arial", "#bcff7c")
  char4.x = 609;
  char4.y = 373 ;

stage.addChild(note1, note2, note3, note4, char1, char2, char3, char4)


  createjs.Ticker.setFPS(55);
  createjs.Ticker.addEventListener("tick", handleTick);

  function handleTick(event){
    if (song.currentTime() > 0 && song.currentTime() < song.duration()-.02){
      sheet.setCurrentTime(song.currentTime())
      sheet.play()
    }
    if (song.currentTime() > song.duration()-.02 && song.currentTime() < song.duration()) {
      let soGood = new Audio();
      soGood.src = "./assets/sounds/so_good_AJ.m4a";
      soGood.play();
      $("#play").html("play");
    }
    stage.update(event)
  }
});
