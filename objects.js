//In-game objects
//Die, Pawn

Die = function() {
  this.rot = [0,0,0];
  this.block = new Cube([0,0,0],3);
  this.block.color = [0.7,0,0];
  this.dot = new Spheroid([0,0,1.5],[0.4,0.4,0.1]);
  this.dot.color = [1,1,1];
  this.block.texture = textures[1];
}

Die.prototype.draw = function() {
  pushMatrix();
  translate([0,0,3]);
  xRotate(this.rot[0]);
  yRotate(this.rot[1]);
  zRotate(this.rot[2]);
  this.block.draw();

  //ONE
  this.dot.draw();
  xRotate(90);

  //THREE
  this.dot.draw();
  translate([0.8,0.8,0]);
  this.dot.draw();
  translate([-1.6,-1.6,0]);
  this.dot.draw();
  translate([0.8,0.8,0]);
  xRotate(90);

  //SIX
  translate([0.8,0.8,0]);
  this.dot.draw();
  translate([0,-0.8,0]);
  this.dot.draw();
  translate([0,-0.8,0]);
  this.dot.draw();
  translate([-1.6,0,0]);
  this.dot.draw();
  translate([0,0.8,0]);
  this.dot.draw();
  translate([0,0.8,0]);
  this.dot.draw();
  translate([0.8,-0.8,0]);
  xRotate(90);

  //FOUR
  translate([0.75,0.75,0]);
  this.dot.draw();
  translate([0,-1.5,0]);
  this.dot.draw();
  translate([-1.5,0,0]);
  this.dot.draw();
  translate([0,1.5,0]);
  this.dot.draw();
  translate([0.75,-0.75,0]);
  yRotate(90);

  //FIVE
  this.dot.draw();
  translate([0.8,0.8,0]);
  this.dot.draw();
  translate([0,-1.6,0]);
  this.dot.draw();
  translate([-1.6,0,0]);
  this.dot.draw();
  translate([0,1.6,0]);
  this.dot.draw();
  translate([0.8,-0.8,0]);

  //TWO
  yRotate(180);
  translate([0.75,0.75,0]);
  this.dot.draw();
  translate([-1.5,-1.5,0]);
  this.dot.draw();
  translate([0.75,0.75,0]);

  popMatrix();
}

Tile = function(number, center) {
  this.number = number;
  this.position = center;
  this.tile = new Cuboid(center,[1.2,1.2,0.1]);
  this.tile.color = [0.9,0.9,0.9];
  this.tile.selectColor = [number/255,0,1];
  this.tile.texture = textures[1];
}

Tile.prototype.draw = function() {
  pushMatrix();
  this.tile.draw();
  popMatrix();
}

function buildTiles() {
  tileIndex = 0; 
  for(var i = 0; i < 6; i++){
    tiles.push(new Tile(tileIndex++, [(7-i)*1.3,-1.3,-0.1]));
  }
  tiles.push(new Tile(tileIndex++, [2.6,-2.6,-0.1]));
  for(var i = 0; i < 6; i++){
    tiles.push(new Tile(tileIndex++, [1.3,(-2-i)*1.3,-0.1]));
  }
  tiles.push(new Tile(tileIndex++, [0,-9.1,-0.1]));
  for(var i = 0; i < 6; i++){
    tiles.push(new Tile(tileIndex++, [-1.3,(i-7)*1.3,-0.1]));
  }
  tiles.push(new Tile(tileIndex++, [-2.6,-2.6,-0.1]));
  for(var i = 0; i < 6; i++){
    tiles.push(new Tile(tileIndex++, [(-2-i)*1.3,-1.3,-0.1]));
  }
  tiles.push(new Tile(tileIndex++, [-9.1,0,-0.1]));
  for(var i = 0; i < 6; i++){
    tiles.push(new Tile(tileIndex++, [(i-7)*1.3,1.3,-0.1]));
  }
  tiles.push(new Tile(tileIndex++, [-2.6,2.6,-0.1]));
  for(var i = 0; i < 6; i++){
    tiles.push(new Tile(tileIndex++, [-1.3,(2+i)*1.3,-0.1]));
  }
  tiles.push(new Tile(tileIndex++, [0,9.1,-0.1]));
  for(var i = 0; i < 6; i++){
    tiles.push(new Tile(tileIndex++, [1.3,(7-i)*1.3,-0.1]));
  }
  tiles.push(new Tile(tileIndex++, [2.6,2.6,-0.1]));
  for(var i = 0; i < 6; i++){
    tiles.push(new Tile(tileIndex++, [(2+i)*1.3,1.3,-0.1]));
  }
  tiles.push(new Tile(tileIndex++, [9.1,0,-0.1]));
  for(var i = 0; i < 5; i++){
    tiles.push(new Tile(tileIndex++, [0,7.8-i*1.3,-0.1]));
    tiles[tileIndex-1].tile.color = YELLOW;
  }
  for(var i = 0; i < 5; i++){
    tiles.push(new Tile(tileIndex++, [-7.8+i*1.3,0,-0.1]));
    tiles[tileIndex-1].tile.color = GREEN;
  }
  for(var i = 0; i < 5; i++){
    tiles.push(new Tile(tileIndex++, [0,-7.8+i*1.3,-0.1]));
    tiles[tileIndex-1].tile.color = RED;
  }
  for(var i = 0; i < 5; i++){
    tiles.push(new Tile(tileIndex++, [7.8-i*1.3,0,-0.1]));
    tiles[tileIndex-1].tile.color = BLUE;
  }
}

Pawn = function(color, position) {
  let center = position;
  this.pawnHead = new Sphere([center[0],center[1],center[2]+1.5],0.25);
  this.pawnHead.color = color;
  this.pawnBody = new RotationalSolid(center,[0.2,0.2,1.5],function(z){return pawnEq(z)});
  this.pawnBody.color = [color,color];
  this.tile = -1;
  this.homePos = position;
  this.startPos = null;
  this.pawnBody.texture = textures[1];
  this.pawnHead.texture = textures[1];
  switch(color){
    case RED:
      this.startPos = tiles[14].position;
      break;
    case BLUE:
      this.startPos = tiles[0].position;
      break;
    case GREEN:
      this.startPos = tiles[28].position;
      break;
    case YELLOW:
      this.startPos = tiles[42].position;
      break;
  }
}

Pawn.prototype.draw = function() {
  pushMatrix();
  this.pawnHead.draw();
  this.pawnBody.draw();
  popMatrix();
}

function buildPawns() {
  pawns.push(
    new Pawn(RED,[-8,-8,0]),
    new Pawn(RED,[-8,-6.5,0]),					
    new Pawn(RED,[-6.5,-8,0]),					
    new Pawn(RED,[-6.5,-6.5,0]),
    
        
    new Pawn(BLUE,[8,-8,0]),					
    new Pawn(BLUE,[8,-6.5,0]),					
    new Pawn(BLUE,[6.5,-8,0]),					
    new Pawn(BLUE,[6.5,-6.5,0]),
    
      
    new Pawn(GREEN,[-8,8,0]),				
    new Pawn(GREEN,[-8,6.5,0]),			
    new Pawn(GREEN,[-6.5,8,0]),			
    new Pawn(GREEN,[-6.5,6.5,0]),
    
    new Pawn(YELLOW,[8,8,0]),
    new Pawn(YELLOW,[8,6.5,0]),
    new Pawn(YELLOW,[6.5,8,0]),
    new Pawn(YELLOW,[6.5,6.5,0])
  );
}

pawnEq = function(z) {
  waveFunc = Math.sin(35*z-13.7)/(z+0.23);
  expFunc = 0.3/z;
  if(expFunc > 2.5){
    return 2.5;
  }
  else {
    return waveFunc > expFunc ? waveFunc : expFunc;
  }
}

const dieConfigurations = [
  [[0,90,0],[0,270,280],[180,90,180],[180,270,0]],
  [[0,90,270],[0,270,90],[180,90,90],[180,270,270]],
  [[0,90,90],[0,270,270],[180,90,270],[180,270,90]],
  [[0,90,180],[0,270,0],[180,90,0],[180,270,180]]
];

function checkSpecialCases(rot) {
  for(var i = 2; i <= 5; i++) {
    for(var j = 0; j < 4; j++) {
      if(rot[0] == dieConfigurations[i-2][j][0] && 
        rot[1] == dieConfigurations[i-2][j][1] && 
        rot[2] == dieConfigurations[i-2][j][2]){
          return i;
        }
    }
  }
}

Palm = function(zRot, scaleFactor) {
  pushMatrix();
  zRotate(zRot);
  palm = new Conoid([0,0,-0.1],[0.3,0.3,0.6*scaleFactor],[1.2,1.2]);
  palm.draw();
  for(i=0; i<10; i++){
    translate([0,0,0.6*scaleFactor]);
    xRotate(4);
    scale([0.9,0.9,1]);
    palm.draw();
  }
  xRotate(-12);
  var leaf = [ 0,0,0.6,1.4,-0.9,0.2,1.4,0.9,1,4.9,-0.32,0.2,4.9,0.32,1,6.9,0.45,0.1,1.4,0.9,1,
                0,0,0.6,-0.9,1.4,1,-2.5,1.5,0.9,-0.92,2.9,1,-2.56,3.3,0.9,-1.5,4.2,0.1,-1.9,1.4,1,
                0,0,0.6,-0.9,-1.4,0.9,-2.5,-1.5,0.7,-0.92,-2.9,0.9,-2.56,-3.3,0.7,-1.5,-4.2,0.1,-1.9,-1.4,1,
                0,0,0.6,-1.4,-0.9,0.2,-1.4,0.9,1,-4.9,-0.32,0.2,-4.9,0.32,1,-5.9,1.65,0.1,-1.4,0.9,1,
                0,0,0.6,0.9,-1.4,1,2.5,-1.5,0.9,0.92,-2.9,1,2.56,-3.3,0.9,1.5,-4.2,0.1,1.9,-1.4,1,
                0,0,0.6,0.9,1.4,0.9,2.5,1.5,0.7,0.92,2.9,0.9,2.56,3.3,0.7,1.5,4.2,0.1,1.9,1.4,1];
  var leafColor = [0,0.7,0];
  buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER,buf);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(leaf), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(aXYZ);
  gl.vertexAttribPointer(aXYZ,3,gl.FLOAT,false,3*FLOATS,0*FLOATS);
  gl.vertexAttrib3f(aNormal,0,0,1);
  gl.vertexAttrib3fv(aColor, leafColor);
  useMatrix();
  gl.drawArrays(gl.TRIANGLE_STRIP,0,7);
  gl.drawArrays(gl.TRIANGLE_STRIP,7,7);
  gl.drawArrays(gl.TRIANGLE_STRIP,14,7);
  gl.drawArrays(gl.TRIANGLE_STRIP,21,7);
  gl.drawArrays(gl.TRIANGLE_STRIP,28,7);
  gl.drawArrays(gl.TRIANGLE_STRIP,35,7);
  popMatrix();
}