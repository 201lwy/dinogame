const canvas = document.getElementById('canvas');
const ctx=canvas.getContext('2d');
canvas.width=1000;
canvas.height=600;

const buttonContainer = document.createElement('div');
buttonContainer.style.position = 'absolute';
buttonContainer.style.top = '10px';
buttonContainer.style.left = '10px';
buttonContainer.style.zIndex = '1000';

const buttonStyle = `
    padding: 10px 15px;
    margin: 5px;
    font-size: 14px;
    cursor: pointer;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const pauseButton = document.createElement('button');
pauseButton.textContent = '일시정지';
pauseButton.style.cssText = buttonStyle;
pauseButton.addEventListener('click', () => {
    const event = new Event('togglePause'); // Custom event to pause/resume
    document.dispatchEvent(event);
});

const manualButton = document.createElement('button');
manualButton.textContent = '설명서';
manualButton.style.cssText = buttonStyle;
manualButton.addEventListener('click', () => {
    alert('게임 설명서:\n- 조작법: 스페이스 바를 눌러 선인장을 피하세요.\n- 팁: 최대한 오래 살아남아 높은 점수를 얻으세요.');
});

buttonContainer.appendChild(pauseButton);
buttonContainer.appendChild(manualButton);

document.body.appendChild(buttonContainer);

let isPaused = false;
document.addEventListener('togglePause', () => {
    isPaused = !isPaused;
    if (isPaused) {
        // Pause the game logic
        console.log('게임이 일시정지되었습니다.');
        // Add your game's pause logic here
    } else {
        // Resume the game logic
        console.log('게임이 다시 시작되었습니다.');
        // Add your game's resume logic here
    }
});

var img_dino_list=[]
var img_dino = new Image();
var img_back=new Image();
var img_cactus=new Image();
for(i=0; i<10; i++){
    var img_dino=new Image();
    img_dino.src='img/kirby'+i+'.png';
    img_dino_list.push(img_dino);
}

img_dino.src='img/kirby.png';
img_back.src='img/background.jpg';
img_cactus.src='img/cactus.png'


var dino={
    x:50,
    y:canvas.height-100,
    width:70,
    height:70,
    index:0,
    draw() {
        //ctx.fillStyle = 'green';
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        if(frame%5==0){
            this.index=(this.index+1)%10;
        }
        ctx.drawImage(img_dino_list[this.index],this.x,this.y,this.width,this.height)
    }
}

class Cactus{
    constructor(){
        this.x=canvas.width;
        this.y=500;
        this.width=50;
        this.height=50;
    }
    draw(){
        //ctx.fillStyle = 'red';
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img_cactus,this.x,this.y,this.width,this.height)
    }

}

var cactus={
    x:900,
    y:500,
    width:60,
    height:60,
    //draw() {
       // ctx.fillStyle = 'red';
        //ctx.fillRect(this.x, this.y, this.width, this.height);

    //}
}
var jump=false;
var step=-3;
var frame=0;
var cactus_list=[];
var animation;
function play() {
    animation = requestAnimationFrame(play);
    frame+=1;
    if(frame%240===0){
        var cactus=new Cactus();
        cactus_list.push(cactus);
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(img_back,0,0,canvas.width,canvas.height);
    ctx.font='20px Arial';
    ctx.fillStyle='black';
    ctx.textAlign='center';
    ctx.fillText('Score : '+frame, canvas.width-100,50);

    cactus_list.forEach((a,i,o)=>{
        if(a.x<-a.width){
            o.splice(1,1);
        }
        a.x-=1
        a.draw();
        collision(dino,a)
    })

    if (jump===true){
        dino.y += step;
        if(dino.y<=200){
            step*=-1;

        }
        if(dino.y===500){
            jump=false;
            step*=-1;
        }

    }    
    dino.draw();
    
}
play()

document.addEventListener('keydown',function(e){
    if(e.code==='Space'){
        jump=true;
    }
})

function collision(dino,cactus){
    ctx.font='30px Arial';
    ctx.fillStyle='red';
    ctx.textAlign='center';
    var x_len = cactus.x-(dino.x+dino.width);
    var y_len = cactus.y-(dino.y+dino.height);

    if(x_len<-25 && y_len<0){
        ctx.fillText("Game Over", canvas.width/2,canvas.height/2)
        cancelAnimationFrame(animation)
    }
}