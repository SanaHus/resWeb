var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

class Player{
    constructor(x, y, radius, color)
    {
        this.pos_x = x;
        this.pos_y = y;
        this.radius = radius;
        this.color = color;
    }

    draw()
    {
        context.arc(this.pos_x, this.pos_y, this.radius, 0, 2*Math.PI);
        context.fillStyle = this.color;
        context.fill();
    }
}

class bullet{
    constructor(posX, posY, radius, color){
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.color = color;
    }

    shot()
    {
        context.beginPath();
        context.arc(this.posX,this.posY,this.radius,0,2*Math.PI);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }
}

canvas.onclick = function(event){ 
    const x = event.clientX - context.canvas.offsetLeft;
    const y = event.clientY - context.canvas.offsetTop;
    //context.fillRect(x-15, y-15, 30, 30); 
    
    var o = new bullet(x,y,10,"magenta");
    o.shot();
}
    
    

var p = new Player(100,100,30,"pink");
p.draw();
