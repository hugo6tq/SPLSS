var game = {

  eYou : null, // holds your move HTML container
  eCom : null, // holds computer move HTML container
  eSel : null, // holds HTML selector
  eGo : null,  // holds HTML go button
  eWin : null, wins : 0,   // wins counter
  eLose: null, loses : 0,  // loses counter
  eDraw : null, draws : 0, // draws counter

  load : function () {
  // load() : preload all the images
    var images = ["Spock.svg", "Paper.svg", "Lizard.svg", "Scissor.svg", "Stone.svg"],
        img = null,
        loaded = 0;
    for (var i of images) {
      img = new Image();
      img.onload = function(){
        loaded++;
        if (loaded == images.length) { game.init(); }
      };
      img.src = i;
    }
  },

  init : function () {
  // init() : prepare the game
    game.eYou = document.getElementById("g_you_move");
    game.eCom = document.getElementById("g_comp_move");
    game.eSel = document.getElementById("g_you_sel");
    game.eGo = document.getElementById("g_you_go");
    game.eWin = document.getElementById("g_win");
    game.eLose = document.getElementById("g_lose");
    game.eDraw = document.getElementById("g_draw");

    // When user changes selection
    game.eSel.addEventListener("change", game.switch);
    game.switch();

    // When user hits "Go!"
    game.eGo.addEventListener("click", game.game);

    // Unlock all controls
    game.eSel.disabled = false;
    game.eGo.disabled = false;
  },

  /* [GAME RUN] */
  switch : function () {
    var img = new Image();
    img.src = game.eSel.value + ".svg";
    game.eYou.innerHTML = "";
    game.eYou.appendChild(img);
  },

  game : function () {
    var comMove = Math.random();
    if (comMove <= 0.20) { comMove = "Spock"; }
    else if (comMove <= 0.40) { comMove = "Paper"; }
    else if (comMove <= 0.60) { comMove = "Lizard"; }
    else if (comMove <= 0.80) { comMove = "Scissor"; }
    else { comMove = "Stone"; }

    // Update computer move graphic
    var img = new Image();
    img.src = comMove + ".svg";
    game.eCom.innerHTML = "";
    game.eCom.appendChild(img);

    // Win, lose, or draw?
    var youMove = game.eSel.value;
    if (youMove == comMove) {
      game.draws++;
      game.eDraw.innerHTML = game.draws;
      alert("DRAW");
    } else {
      var win = false;
      switch (youMove) {
        case "Spock":
          if (comMove=="Stone" || comMove=="Scissor") { win = true; }
          break;
        case "Paper":
          if (comMove=="Spock" || comMove=="Stone") { win = true; }
          break;
        case "Lizard":
          if (comMove=="Paper" || comMove=="Spock") { win = true; }
          break;  
        case "Scissor":
          if (comMove=="Lizard" || comMove=="Paper") { win = true; }
          break;
        case "Stone":
          if (comMove=="Scissor" || comMove=="Lizard") { win = true; }
          break;    
      }
      if (win) {
        game.wins++;
        game.eWin.innerHTML = game.wins;
        alert("YOU WIN");
      } else {
        game.loses++;
        game.eLose.innerHTML = game.loses;
        alert("YOU LOSE");
      }
    }
  }
};
window.addEventListener("load", game.load);