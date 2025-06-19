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
//全局字体大小
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

        this.hasTrail =Math.random() >0.5;

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
            if(this.hasTrail){
                for (let i = 0; i < 5; i++) {
                    //给乌鸦加入拖尾
                    particles.push(new Particle(this.x, this.y,this.width,this.color))
                }

            }

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

const raven = new Raven();

//实现乌鸦后面的粒子拖尾效果
let particles = [];
class Particle{
    constructor(x,y,size,color) {
        this.size=size;
        //粒子的位置
        this.x=x +this.size/2 + Math.random() *50 -25;
        this.y=y+this.size/3 + Math.random() *50 -25;

        // 生成的粒子的半径
        this.radius = Math.random() * this.size/10;
        this.maxRadius = Math.random()*20+35;
        //是否删除
        this.markedForDeletion = false;
        this.speedX = Math.random()*1+0.5;


        this.color = color;
    }
    update(){
        this.x+=this.speedX;
        this.radius+=0.3;
        //何时删除粒子
        if(this.radius>this.maxRadius-5){
            this.markedForDeletion=true;
        }
    }
    draw(){
        ctx.save();
        //设置粒子透明度 根据这个算法粒子会从大到小慢慢变透明
        ctx.globalAlpha = 1-this.radius/this.maxRadius;
        ctx.beginPath();
        ctx.fillStyle=this.color;
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx.fill();
        ctx.restore();
    }
}

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
            //乌鸦消失
           item.markedForDeletion=true;
           //分数增加
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
    //绘制分数
    drawScore();
    [...particles,...ravens,...explosions].forEach(item=>{
        item.update(deltatime);
    });
    [...particles,...ravens,...explosions].forEach(item=>{
        item.draw();
    })
    //删掉已经移出屏幕的乌鸦
    ravens = ravens.filter(item=>!item.markedForDeletion)

    // 删除爆炸动画
    explosions = explosions.filter(item=>!item.markedForDeletion)
    // 删除爆粒子动画
    console.log(particles)
    particles = particles.filter(item=>!item.markedForDeletion)
   // 判断游戏是否结束
   if(!gameOver){
       requestAnimationFrame(animate);
   }else{
       //触发游戏结束事件
        drawGameOver();
    }
};
animate(0);