class Player{
  constructor(fx,fy,fs,ft,fk){
    this.x=fx
    this.y=fy
    this.speed=fs
    this.texture=ft
    this.keys=fk
  }
  move(){
    if (keyIsDown(this.keys[0])) {
      if (grid_h[floor(this.y-0.001)] [floor(this.x)]==0 && grid_h[floor(this.y-0.001)] [ceil(this.x)]==0 ){
        this.y -= this.speed
      } 
    }
    if (keyIsDown(this.keys[1])) {
      if (grid_h[ceil(this.y+0.001)] [floor(this.x)]==0 && grid_h[ceil(this.y+0.001)] [ceil(this.x)]==0 ){
        this.y += this.speed
      }
    }
    if (keyIsDown(this.keys[2])) {
      if (grid_h[floor(this.y)] [floor(this.x-0.001)]==0 && grid_h[ceil(this.y)] [floor(this.x-0.001)]==0 ){
        this.x -= this.speed
      }
    }
    if (keyIsDown(this.keys[3])) {
      if (grid_h[floor(this.y)] [ceil(this.x+0.001)]==0 && grid_h[ceil(this.y)] [ceil(this.x+0.001)]==0 ){
        this.x += this.speed
      }
    }
    this.x=parseFloat(this.x.toFixed(4))
    this.y=parseFloat(this.y.toFixed(4))
  }
  renderBottom(){
    image(tilesetP[this.texture].get(0,16,16,22),(-cam[0] * zoom + this.x * zoom)-zoom/2, ((-cam[1] * zoom + this.y * zoom)-zoom/2)+10*zoom/16, zoom, zoom*1.5)

  }
  renderTop(){
    image(tilesetP[this.texture].get(0,0,16,16),(-cam[0] * zoom + this.x * zoom)-zoom/2,((-cam[1] * zoom + this.y * zoom)-zoom/2)-6*zoom/16,zoom, zoom)
  }
}