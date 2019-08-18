//Adjusting game - div to user screen size
const gameDiv = document.querySelector("#game");
innerHeight = window.innerHeight
gameDiv.style.height = `${innerHeight-canvasOy}px`
gameDiv.style.top = `${canvasOy}px`;


//Interaction and response when hovering AddPlanet Text and Button.
const button = document.querySelector("#button");
const addPlanet = document.querySelector("#addPlanet");

button.addEventListener("mouseover", function(){
  event.preventDefault();
  console.log("Hi");
  this.src = "js/css/img/button-yellow.png";
  addPlanet.style.color = "#ffd866";
})

button.addEventListener("mouseout", function(){
  event.preventDefault();
  console.log("Hi");
  this.src = "js/css/img/button.png";
  addPlanet.style.color = "whitesmoke";
})


//Adding mew planets!!///////////////////////////////////////////////////////////////////////////////////////////
var i = 0;
let colors = ["#ff6188", "#a9dc76", "#ffd866", "#fc9867", "#03B8E4", "#ab9df2", "#78dce8"]; // all possible colors of planets


function mouseClicked(){ // this funtions has call back funtion every time user clicks the screen.
  var x = event.clientX;
  var y = event.clientY;
  if(y > canvasOy && adding === true){
    putPlanet(x, y);
    adding = false;
    document.body.style.cursor = "default";
  }
  return false;
}

function putPlanet(x, y){ //this function creates a new planet as new object

  if(i === 7){
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


button.addEventListener("click", function(){
  event.preventDefault();
  document.body.style.cursor = "cell";
  this.src = "js/css/img/button-red.png";
  addPlanet.style.color = "#ff6188";
  adding = true;
})

mouseClicked();




/*
var i = 0;
colors = ["#ff6188", "#a9dc76", "#ffd866", "#fc9867", "#03B8E4", "#ab9df2", "#78dce8"];


const form = document.querySelector("#InsertPlanet");
form.addEventListener("click", (event) =>{
  event.preventDefault();

  const formData = new FormData(form);
  x = parseFloat(formData.get("x"));
  y = parseFloat(formData.get("y"));

  if(i === 7){
    i = 0;
  }
  newPlanet = new Planet(
    10,
    x,
    y, 
    colors[i]
  );

  i++;

  planets.push(newPlanet);

});
*/

