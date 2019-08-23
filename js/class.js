//Universal Constants///////////////////////////////////////////////////////////////////////////////////////
const G = Math.pow(6.6, -11);
const planets  = [];
const holes = [];
const vectors = [];
const scale = 0.125*Math.pow(10,10); // One pixel is equal to 500000m
const seconds = 150 //this will a constant representing the time inside de simulation each frame.
//Classes///////////////////////////////////////////////////////////////////////////////////////////////////

class Body{
  constructor(size, Ox, Oy, color, mass){
    this.size = size;
    this.Ox = Ox;
    this.Oy = Oy;
    this.color = color;
    this.mass = mass;
  }

  put(){
    if(this.color !== undefined){
      let c = color(this.color);
      fill(c);
    }
    circle(this.Ox, this.Oy, this.size);
  }

  isOut(){
    if(this.Ox > 0 || this.Oy > 0){
      return false;
    }else{
      return true;
    }
  }

}

class Hole extends Body{
  constructor(size, Ox, Oy, color, mass){
    super(size, Ox, Oy, color, mass);
  }

  
  feelGravityHoles(holes){ //funtions 
    /*
    This fuction will recieve all the holes mass and position.
    1# Based on that data it will calculate the distance between the planet and black hole using analytic geometry
    2# After the distance is calculated, we discorver the acellaration and displacement.
    3# Finally we discorver the angle between the line that represent the shortest distance between the planet and star
    and any horizontal line. So that displacement can be derivated between the horizontal and vetical direction properly.

    Now that more than one black hole can exist in the simulation, the displacement caused by each Black hole will be summed in another function. So this funciton will now return an array of vectors.  

    */
    holes.forEach(hole => {
      if(holes.indexOf(hole) !== holes.indexOf(this)){
        var distance = Math.sqrt(Math.pow(this.Ox - hole.Ox, 2) +  Math.pow(this.Oy - hole.Oy, 2))// #1
        //console.log(distance);
        let acellaration = (hole.mass*G)/Math.pow(distance,2); // #2
        let displacement = ((acellaration*Math.pow(seconds,2)/2)); //#2
        //console.log(displacement);
        var tetha = Math.asin((Math.abs(this.Oy - hole.Oy)/distance)); // #3
        
  
        //this piece of code discorver the new position (x,y) based onde the displacement. 
        let x = Math.abs((displacement))*Math.cos(tetha)*10; 
        let y = Math.abs((displacement)*Math.sin(tetha))*10;
        
  
        //this piece of code adptates the position(x,y) based on the realive position between the bodies
        if(this.Ox > hole.Ox && this.Oy === hole.Oy){ // Case I
          x = x*-1;
          y = 0;
        }else if(this.Ox > hole.Ox && this.Oy < hole.Oy){ //Case 1
          x = x*-1;
    
        }else if(this.Ox == hole.Ox && this.Oy < hole.Oy){ // Case II
          x = 0;
    
        }else if(this.Ox < hole.Ox && this.Oy === hole.Oy){ // Case III
          y = 0;
    
        }else if(this.Ox < hole.Ox && this.Oy > hole.Oy){ //Case 3
          y = y*-1;
    
        }else if(this.Ox === hole.Ox && this.Oy < hole.Oy){ //Case IV
          x = 0;
          y = y*-1;
    
        }else if(this.Ox > hole.Ox && this.Oy > hole.Oy){ //Case 4
          x = x*-1;
          y = y*-1;
        }
        
        var position = [x,y];
        vectors.push(position);
      
      }else{
        return "Same hole";
      }
    });


  }

  sumVectors(vectors){
    let x = 0;
    let y = 0;
    for(let w = 0; w < vectors.length; w++){
      x = x + vectors[w][0];;
      y = y + vectors[w][1];
    }
    
    let position = [x, y];
    return position;
  }

  destroyHole(holes){
    let create = false;
    let d = 0;
    let index = null;
    let mass = this.mass;
    let size = this.size;

    holes.forEach(hole => {
      let distance = Math.sqrt(Math.pow(this.Ox - hole.Ox, 2) +  Math.pow(this.Oy - hole.Oy, 2))// #1
      if(distance <= sunSize-10 && holes.indexOf(this) !== holes.indexOf(hole)){
        mass = mass + hole.mass;
        size = (size + hole.size)*0.8;
        console.log(size, hole.size);
        index = holes.indexOf(hole);
        holes.splice(index, 1);
        d++;
      }
    });
    if(d > 0){
      create = true;
    }
    let arr = [create, size, mass];
    return arr;
  }
}

class Planet extends Body{
  constructor(size, Ox, Oy, color, mass, name){
    super(size, Ox, Oy, color, mass);
    this.name = name;
  }

  
  feelGravity(holes){ //funtions 
    /*
    This fuction will recieve all the holes mass and position.
    1# Based on that data it will calculate the distance between the planet and black hole using analytic geometry
    2# After the distance is calculated, we discorver the acellaration and displacement.
    3# Finally we discorver the angle between the line that represent the shortest distance between the planet and star
    and any horizontal line. So that displacement can be derivated between the horizontal and vetical direction properly.

    Now that more than one black hole can exist in the simulation, the displacement caused by each Black hole will be summed in another function. So this funciton will now return an array of vectors.  

    */
    holes.forEach(hole => {
      var distance = Math.sqrt(Math.pow(this.Ox - hole.Ox, 2) +  Math.pow(this.Oy - hole.Oy, 2))// #1
      //console.log(distance);
      let acellaration = (hole.mass*G)/Math.pow(distance,2); // #2
      let displacement = ((acellaration*Math.pow(seconds,2)/2)); //#2
      //console.log(displacement);
      var tetha = Math.asin((Math.abs(this.Oy - hole.Oy)/distance)); // #3
      

      //this piece of code discorver the new position (x,y) based onde the displacement. 
      let x = Math.abs((displacement))*Math.cos(tetha)*10; 
      let y = Math.abs((displacement)*Math.sin(tetha))*10;
      

      //this piece of code adptates the position(x,y) based on the realive position between the bodies
      if(this.Ox > hole.Ox && this.Oy === hole.Oy){ // Case I
        x = x*-1;
        y = 0;
      }else if(this.Ox > hole.Ox && this.Oy < hole.Oy){ //Case 1
        x = x*-1;
  
      }else if(this.Ox == hole.Ox && this.Oy < hole.Oy){ // Case II
        x = 0;
  
      }else if(this.Ox < hole.Ox && this.Oy === hole.Oy){ // Case III
        y = 0;
  
      }else if(this.Ox < hole.Ox && this.Oy > hole.Oy){ //Case 3
        y = y*-1;
  
      }else if(this.Ox === hole.Ox && this.Oy < hole.Oy){ //Case IV
        x = 0;
        y = y*-1;
  
      }else if(this.Ox > hole.Ox && this.Oy > hole.Oy){ //Case 4
        x = x*-1;
        y = y*-1;
      }
      
      var position = [x,y];
      vectors.push(position);

    });


  }

  sumVectors(vectors){
    let x = 0;
    let y = 0;
    for(let w = 0; w < vectors.length; w++){
      x = x + vectors[w][0];;
      y = y + vectors[w][1];
    }
    
    let position = [x, y];
    return position;
  }
  
  destroy(holes){
    let destroy = false;
    let d = 0;
    holes.forEach(hole => {
      let distance = Math.sqrt(Math.pow(this.Ox - hole.Ox, 2) +  Math.pow(this.Oy - hole.Oy, 2))// #1
      if(distance <= sunSize-10){
        d++;
      }
    });
    if(d > 0){
      destroy = true;
    }
    return destroy;
  }
}
