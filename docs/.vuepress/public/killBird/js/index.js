/** @type {HTMLCanvasElement} 加这行注释会让后面的代码有canvas的代码提示 */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

//碰撞canvas

const collisionCanvas = document.getElementById('collisionCanvas');
const collisionCtx = collisionCanvas.getContext('2d');
collisionCanvas.width=window.innerWidth;
collisionCanvas.height=window.innerHeight;

// 玩家得分
let score = 0;
// 游戏结束状态
let gameOver = false;
ctx.font = '50px Impact'


let timetoNextRaven = 0;
let ravenInterval = 500;
let lastTime = 0;


//渡鸦
let ravens = [];
class Raven{
    constructor() {
        this.spriteWidth = 271;
        this.spriteHeight = 194;
        // 保持宽高比的情况下随机乌鸦大小
        this.sizeModifier = Math.random() * 0.6+0.4
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = canvas.width;
        this.y = Math.random() *(canvas.height-this.height);
        this.directionX = Math.random()*5+3;
        this.directionY = Math.random()*5 - 2.5;
        // 是否已跑出屏幕 或者被点击杀死
        this.markedForDeletion=false;
        //插入图片
        this.img = new Image();
        this.img.src ='./img/raven.png';

        this.frame=0;
        this.maxFrame=4;

        //下面两个参数用于兼容不同性能的机器 flapInterval用于控制帧数 越小越快
        this.timeSinceFlap = 0;
        this.flapInterval =Math.random()*50+50;

        //碰撞canvas 没懂
        //生成随机颜色
        this.randomColors = [Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255)];
        this.color = `rgb(${this.randomColors[0]},${this.randomColors[1]},${this.randomColors[2]})`


        this.timer=0;
        // 随机生成旋转角度
        this.angle = Math.random()*6.2;
        // 加入声音
        this.sound =  new Audio();
        this.sound.src='./sound/shotgun.wav'
    }
    update(deltatime){
        //如果接触到游戏区域的顶部或者底部就反弹
        if(this.y<0||this.y>canvas.height-this.height){
            this.directionY = this.directionY *-1;
        }
        this.x -= this.directionX;
        this.y += this.directionY;
        if(this.x< 0-this.width){
           this.markedForDeletion=true;
        }

        this.timeSinceFlap += deltatime;
        if(this.timeSinceFlap>this.flapInterval){
            //精灵图从第一帧往后加 加到最后重置
            if(this.frame>this.maxFrame){
                this.frame=0;
            }else{
                this.frame++;
            }
            this.timeSinceFlap=0;
        }
        if(this.x<0-this.width){
            gameOver=true;
        }
        // console.log(deltatime)
    }
    draw(){
        //给每个乌鸦加上随机的背景色
        collisionCtx.fillStyle = this.color;
        collisionCtx.fillRect(this.x,this.y,this.width,this.height);
        //绘制乌鸦
        ctx.drawImage(this.img,this.spriteWidth*this.frame,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height);
    }
}







//获得画布相对于浏览器的偏移量
let canvasPosition = canvas.getBoundingClientRect();


//爆炸效果
let explosions = [];
class Explosion{
    constructor(x,y,size) {

        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.size=size;
        this.width = this.spriteWidth/2;
        this.height = this.spriteHeight/2;
        this.x=x;
        this.y=y;
        this.img = new Image();
        this.img.src ='./img/boom.png';
        this.frame=0;
        this.timer=0;
        // 随机生成旋转角度
        this.angle = Math.random()*6.2;
        // 加入声音
        this.sound =  new Audio();
        this.sound.src='./sound/shotgun.wav'
        //无法理解的
        this.timeSiceLastFram = 0;
        this.framInterval =200;
        this.markedForDeletion=false;
    }
    update(deltatime){
        if(this.frame===0)this.sound.play();
        this.timeSiceLastFram+=deltatime;
        if( this.timeSiceLastFram >this.framInterval){
            this.frame++;
            this.timeSiceLastFram = 0;
            if(this.frame>5){
                this.markedForDeletion=true;
            }
        }
    }
    draw(){
        // ctx.save();
        // // 设置围绕哪个点旋转
        // ctx.translate(this.x,this.y);
        // //设置旋转的角度
        // ctx.rotate(this.angle);
        ctx.drawImage(this.img,this.spriteWidth*this.frame,0,this.spriteWidth,this.spriteHeight,this.x,this.y-this.size/4,this.size,this.size);
        // ctx.restore();
    }
}
//
// window.addEventListener('click',e=>{
//     // console.log(e,ctx)
//     // ctx.fillStyle = 'white';
//     // //减去的数值是物体宽高的一半 保证物体中心出现在鼠标点击的位置
//     // ctx.fillRect(e.x-canvasPosition.left-25,e.y-canvasPosition.top-25,50,50);
//
//     createAnimation(e);
// })

// window.addEventListener('mousemove',e=>{
//     // console.log(e,ctx)
//     // ctx.fillStyle = 'white';
//     // //减去的数值是物体宽高的一半 保证物体中心出现在鼠标点击的位置
//     // ctx.fillRect(e.x-canvasPosition.left-25,e.y-canvasPosition.top-25,50,50);
//
//     createAnimation(e);
// })

// function createAnimation(e){
//     let positionX = e.x-canvasPosition.left;
//     let positionY = e.y-canvasPosition.top;
//     explosions.push(new Explosion(positionX,positionY));
// }

const raven = new Raven();


// 绘制分数方法
function drawScore(){
    // 设置颜色
    ctx.fillStyle='black';
    // 设置内容
    ctx.fillText(`Score${score}`,50,75);
    // 通过偏移位置 修改颜色 实现阴影效果
    ctx.fillStyle='white';
    ctx.fillText(`Score${score}`,55,80);
}

//绘制游戏结束
function drawGameOver(){
    ctx.textAlign='center'
    ctx.fillStyle='black';
    ctx.fillText(`乌鸦吃掉了你的脑子,你的分数是：${score}`,canvas.width/2,canvas.height/2);
    ctx.fillStyle='white';
    ctx.fillText(`乌鸦吃掉了你的脑子,你的分数是：${score}`,canvas.width/2+5,canvas.height/2+5);
}

//监听点击事件 点击乌鸦将其杀死
window.addEventListener('click',e=>{
    // console.log(e,ctx)
    // 通过检测点击到地方的颜色来判断是否点击到了乌鸦
    //getImageData 传入 点击点的x坐标 y坐标 以及范围 1px 1px
    const detectPixelColor = collisionCtx.getImageData(e.x,e.y,1,1);
    console.log(detectPixelColor)
    const pc = detectPixelColor.data;
    ravens.forEach(item=>{
        //如果颜色相等
        if(item.randomColors[0]==pc[0]&&item.randomColors[1]==pc[1]&&item.randomColors[2]==pc[2]){
           item.markedForDeletion=true;
           score++;
           //触发爆炸效果
            explosions.push(new Explosion(item.x,item.y,item.width));
        }
    })
})

function animate(timestamp){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    collisionCtx.clearRect(0,0,canvas.width,canvas.height);
    let deltatime = timestamp-lastTime;
    lastTime=timestamp;
    timetoNextRaven +=deltatime;

   // 两个乌鸦之间的间隔大于500ms 就加入新乌鸦
    if(timetoNextRaven>ravenInterval){
        ravens.push(new Raven());
        // 下一只乌鸦从零开始
        timetoNextRaven=0;
        //给乌鸦排序 大的先渲染
        ravens.sort((a,b)=>a.width-b.width)
    }
    drawScore();
    [...ravens,...explosions].forEach(item=>{
        item.update(deltatime);
    });
    [...ravens,...explosions].forEach(item=>{
        item.draw();
    })
    //删掉已经移出屏幕的乌鸦
    ravens = ravens.filter(item=>!item.markedForDeletion)
    explosions = explosions.filter(item=>!item.markedForDeletion)
    // console.log(deltatime);
    // raven.update();
    // raven.draw();
    // for (let i = 0; i < explosions.length; i++) {
    //     explosions[i].update();
    //     explosions[i].draw();
    //     //判断动画如果已经播放完就从数组中删除
    //     if(explosions[i].frame>5){
    //         explosions.splice(i,1);
    //         i--;
    //     }
    // }
   if(!gameOver){
       requestAnimationFrame(animate);
   }else{
        drawGameOver();
    }
};
animate(0);