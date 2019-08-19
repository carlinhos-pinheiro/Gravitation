const button = document.querySelector("#button");
let colors = ["#ff6188", "#ffd866", "#fc9867", "#ab9df2", "#78dce8","#c7fe40"]; // all possible colors of planets and top bar in hexadecimal.

// Random color of the Topbar
topColor = Math.floor(Math.random()*6);
const topContainer = document.querySelector(".TopContainer")
console.log(topContainer);
topContainer.style.background = colors[topColor];



//Adjusting game - div to user screen size
const gameDiv = document.querySelector("#game");
innerHeight = window.innerHeight
gameDiv.style.height = `${innerHeight-canvasOy}px`
gameDiv.style.top = `${canvasOy}px`;


//Interaction and response when hovering AddPlanet Text and Button.
const addPlanet = document.querySelector("#addPlanet");

button.src = `js/css/img/button${topColor}.png`
button.addEventListener("mouseover", function(){
  event.preventDefault();
  console.log("Hi");
  this.src = `js/css/img/button${topColor}.png`
  addPlanet.style.color = "whitesmoke";
})

button.addEventListener("mouseout", function(){
  event.preventDefault();

  this.src = `js/css/img/button-black.png`;
  addPlanet.style.color = "black";
})


//Adding mew planets!!///////////////////////////////////////////////////////////////////////////////////////////
var i = 0;
adding = false;

function putPlanet(x, y){ //this function creates a new planet as new object

  if(i === 6){
    i = 0;
  }
  newPlanet = new Planet(
    10,
    x,
    y-canvasOy, 
    colors[i]
  );

  i++;

  planets.push(newPlanet);
}


function mouseClicked(event){ // this funtions has call back funtion every time user clicks the screen.
  var x = event.clientX;
  var y = event.clientY;
  if(y > canvasOy && adding === true){
    putPlanet(x, y);
    adding = false;
    document.body.style.cursor = "default";
  }
  return false;
}


button.addEventListener("click", function(){
  event.preventDefault();
  document.body.style.cursor = "cell";
  adding = true; // the value true will activate the function MouseCliked to actually add a planet in the simulation
})

mouseClicked();


