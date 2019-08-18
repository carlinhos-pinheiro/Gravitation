
//Listening user input and adding planet to simulation
const button = document.querySelector("#button");
console.log(button);
button.addEventListener("mouseover", function(){
  event.preventDefault();
  console.log("Hi");
  this.src = "js/css/img/button-yellow.png";
})

button.addEventListener("mouseout", function(){
  event.preventDefault();
  console.log("Hi");
  this.src = "js/css/img/button.png";
})

const game = document.querySelector(".Grav");
console.log(game);

button.addEventListener("click", function(){
  event.preventDefault();
  document.body.style.cursor = 'cell';
})




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
