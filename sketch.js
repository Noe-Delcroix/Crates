var grid_t = []
var grid_h = []
var grid_r = []
var gridsize=[100,100]
const speed = 0.1
var x;
var y
var cam 
var zoom=45 
var tileset1
var tilesetP
var BG
var levels

var players=[]

const hitboxes=[0,1,0,1,1,0,0,1,1,0]
const transparent=[0,4,5,6,7,8]
const blockscode=[[255,255,255],[0,0,255],[255,128,0],[255,255,0],[128,128,128],[0,255,0],[255,0,0],[0,0,0],[64,64,64],[0,255,255]]
const textures=[0,3,6,7,10,13,14,17,18,19,22]
const ground = [0,2,6,9]

function loadTileset(ts){
  BG = loadImage("sprites/backgrounds/BG"+ts+".png")
  tileset1=[]
  tileset1.push(loadImage("sprites/tileset"+ts+"/ground0.png"))
  tileset1.push(loadImage("sprites/tileset"+ts+"/ground1.png"))
  tileset1.push(loadImage("sprites/tileset"+ts+"/ground2.png"))
  tileset1.push(loadImage("sprites/tileset"+ts+"/bricks0.png"))
  tileset1.push(loadImage("sprites/tileset"+ts+"/bricks1.png"))
  tileset1.push(loadImage("sprites/tileset"+ts+"/bricks2.png"))
  tileset1.push(loadImage("sprites/tileset"+ts+"/start.png"))
  tileset1.push(loadImage("sprites/tileset"+ts+"/box0.png"))
  tileset1.push(loadImage("sprites/tileset"+ts+"/box1.png"))
  tileset1.push(loadImage("sprites/tileset"+ts+"/box2.png"))
  tileset1.push(loadImage("sprites/tileset"+ts+"/machine0.png"))
  tileset1.push(loadImage("sprites/tileset"+ts+"/machine1.png"))
  tileset1.push(loadImage("sprites/tileset"+ts+"/machine2.png"))
  tileset1.push(loadImage("sprites/tileset"+ts+"/lamp.png"))
  tileset1.push(loadImage("sprites/tileset"+ts+"/tools0.png"))
  tileset1.push(loadImage("sprites/tileset"+ts+"/tools1.png"))
  tileset1.push(loadImage("sprites/tileset"+ts+"/tools2.png"))
  tileset1.push(loadImage("sprites/tileset"+ts+"/iron.png"))
  tileset1.push(loadImage("sprites/tileset"+ts+"/chair.png"))
  tileset1.push(loadImage("sprites/tileset"+ts+"/grid0.png"))
  tileset1.push(loadImage("sprites/tileset"+ts+"/grid1.png"))
  tileset1.push(loadImage("sprites/tileset"+ts+"/grid2.png"))  
}

function preload(){
  levels=[]
  levels.push(loadImage("levels/level1.png"))
  levels.push(loadImage("levels/level2.png"))
  levels.push(loadImage("levels/level3.png"))
  tilesetP=[]
  tilesetP.push(loadImage("sprites/CrateT1.png"))
  tilesetP.push(loadImage("sprites/CrateT0.png"))
  loadTileset(1)
}



function loadLevel(level){
grid_t = []
grid_h = []
grid_r = []
gridsize=[levels[level].width,levels[level].height]
  for (y = 0; y < gridsize[1]; y++) {
    grid_t[y]=[]
    grid_h[y]=[]
    grid_r[y]=[]
    for (x = 0; x < gridsize[0]; x++) {
        if (random(0,99)<25){
          grid_r[y][x]=int(random(1,3))
        } else {
          grid_r[y][x]=0
        }
        
        for (let c=0;c<blockscode.length;c++){
          if (levels[level].get(x,y)[0]==blockscode[c][0] && levels[level].get(x,y)[1]==blockscode[c][1] && levels[level].get(x,y)[2]==blockscode[c][2]){
            grid_h[y][x]=hitboxes[c]
            grid_t[y][x]=c
            if (c==2){
              cam=[x,y]
              for (player of players){
                player.x=x
                player.y=y
              }
            }
          }
        }
      }
    }
}



function setup() {
  players.push(new Player(2,2,0.1,1,[38,40,37,39]))
  //players.push(new Player(2,2,0.1,0,[90,83,81,68]))
  loadLevel(2)
  createCanvas(1000, 700)
  frameRate(60)
}

function draw() {
  image(BG,cam[0]*-10,cam[1]*-10,1500,1050)
  for (p of players){
    p.move()
  }
   
  if (players.length==2){ 
  cam[0]+=((players[0].x+players[1].x)/2-cam[0])/15
  cam[1]+=((players[0].y+players[1].y)/2-cam[1])/15
  } else {
    cam[0]+=(players[0].x-cam[0])/20
    cam[1]+=(players[0].y-cam[1])/20
  }


  translate(width/2,height/2)
  renderGround()
  for (p of players){
    p.renderBottom()
  }
  renderTiles()
  for (p of players){
   p.renderTop() 
  } 
}

function renderGround() {
  for (y = 0; y < gridsize[1]; y++) {
    for (x = 0; x < gridsize[0]; x++) {
      if (-cam[0] * zoom + x * zoom + zoom/2 >-width/2 && -cam[0] * zoom + x * zoom - zoom/2<width/2 && -cam[1] * zoom + y * zoom + zoom/2 >-height/2 && -cam[1] * zoom + y * zoom - zoom/2 <height/2){
        if (transparent.includes(grid_t[y][x])){
        image(tileset1[0+grid_r[y][x]],(-cam[0] * zoom + x * zoom)-zoom/2, ((-cam[1] * zoom + y * zoom)-zoom/2)-6*zoom/16,zoom,ceil(zoom*22/16))
        }
        if (ground.includes(grid_t[y][x])) {
          if (textures[grid_t[y][x]]+1==textures[grid_t[y][x]+1]){
            image(tileset1[textures[grid_t[y][x]]],(-cam[0] * zoom + x * zoom)-zoom/2, ((-cam[1] * zoom + y * zoom)-zoom/2)-6*zoom/16,zoom,ceil(zoom*22/16))
          }else{
            image(tileset1[textures[grid_t[y][x]]+grid_r[y][x]],(-cam[0] * zoom + x * zoom)-zoom/2, ((-cam[1] * zoom + y * zoom)-zoom/2)-6*zoom/16,zoom,ceil(zoom*22/16))
          }       
        }
      }
    }
  }
}

function renderTiles() {
  for (y = 0; y < gridsize[1]; y++) {
    for (x = 0; x < gridsize[0]; x++) {
      if (-cam[0] * zoom + x * zoom + zoom/2 >-width/2 && -cam[0] * zoom + x * zoom - zoom/2<width/2 && -cam[1] * zoom + y * zoom + zoom/2 >-height/2 && -cam[1] * zoom + y-1 * zoom - zoom/2 <height/2){
        if (!ground.includes(grid_t[y][x])) {
          if (textures[grid_t[y][x]]+1==textures[grid_t[y][x]+1]){
            image(tileset1[textures[grid_t[y][x]]],(-cam[0] * zoom + x * zoom)-zoom/2, ((-cam[1] * zoom + y * zoom)-zoom/2)-6*zoom/16,zoom,ceil(zoom*22/16)*1.05)
          }else{
            image(tileset1[textures[grid_t[y][x]]+grid_r[y][x]],(-cam[0] * zoom + x * zoom)-zoom/2, ((-cam[1] * zoom + y * zoom)-zoom/2)-6*zoom/16,zoom,ceil(zoom*22/16)*1.05)
          }
        }
      }
    }
  }
  fill(255)
  noStroke() 
  textSize(40)
  textAlign(LEFT,TOP)
  text(int(frameRate()),-width/2,-height/2)
}
function keyPressed() {
  if (keyCode == 97) {
    loadTileset(1)
  }else if (keyCode == 98) {
    loadTileset(2)
  }else if (keyCode == 99) {
    loadTileset(3)
  }
}