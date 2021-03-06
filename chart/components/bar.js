/*
 * Chart 图表
 * 柱状图
 * 主要功能如下：
 * 1、文本绘制
 * 2、XY轴的绘制
 * 3、数据分组绘制
 * 4、数据动画的实现
 * 5、鼠标事件处理 
 *
 */

function goBarChart(dataArr) {
    // 声明所需变量
    var canvas, ctx;
    // 图表属性
    var cWidth, cHeight, cMargin, cSpace;
    var originX, originY;
    // 柱状图属性
    var bMargin, tobalBars, bWidth, maxValue;
    var totalYNomber;
    var gradient;

    // 运动相关变量
    var ctr, numctr, speed;
    //鼠标移动
    var mousePosition = {};

    // 获得canvas上下文
    canvas = document.getElementById("barChart");
    if (canvas && canvas.getContext) {
        ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
    }
    initChart(); // 图表初始化
    drawLineLabelMarkers(); // 绘制图表轴、标签和标记
    drawBarAnimate(); // 绘制柱状图的动画
    //检测鼠标移动
    var mouseTimer = null;
    canvas.addEventListener("click", function(e) {
        e = e || window.event;
        if (e.layerX || e.layerX == 0) {
            mousePosition.x = e.layerX;
            mousePosition.y = e.layerY;
        } else if (e.offsetX || e.offsetX == 0) {
            mousePosition.x = e.offsetX;
            mousePosition.y = e.offsetY;
        }

        clearTimeout(mouseTimer);
        mouseTimer = setTimeout(function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawLineLabelMarkers();
            drawBarAnimate(true);
        }, 10);
    });

    //点击刷新图表
    canvas.onclick = function() {
        //initChart(); // 图表初始化
        //drawLineLabelMarkers(); // 绘制图表轴、标签和标记
        drawBarAnimate(); // 绘制折线图的动画
    };


    // 图表初始化
    function initChart() {
        // 图表信息
        cMargin = 30;
        cSpace = 60;
        cHeight = canvas.height - cMargin * 2 - cSpace;
        cWidth = canvas.width - cMargin * 2 - cSpace;
        originX = cMargin + cSpace;
        originY = cMargin + cHeight;

        // 柱状图信息
        bMargin = 15;
        tobalBars = dataArr.length;
        bWidth = parseInt(cWidth / tobalBars - bMargin);
        maxValue = 0;
        for (var i = 0; i < dataArr.length; i++) {
            var barVal = parseInt(dataArr[i][1]);
            if (barVal > maxValue) {
                maxValue = barVal;
            }
        }
        maxValue += 50;
        totalYNomber = 10;
        // 运动相关
        ctr = 1;
        numctr = 100;
        speed = 16;

        //柱状图渐变色
        gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'green');
        gradient.addColorStop(1, 'rgba(67,203,36,1)');

    }

    // 绘制图表轴、标签和标记
    function drawLineLabelMarkers() {
        ctx.translate(0.5, 0.5); // 当只绘制1像素的线的时候，坐标点需要偏移，这样才能画出1像素实线
        ctx.font = "12px Arial";
        ctx.lineWidth = 1;
        ctx.fillStyle = "#000";
        ctx.strokeStyle = "#000";
        // y轴
        drawLine(originX, originY, originX, cMargin);
        // x轴
        drawLine(originX, originY, originX + cWidth, originY);

        // 绘制标记
        drawMarkers();
        ctx.translate(-0.5, -0.5); // 还原位置
    }

    // 画线的方法
    function drawLine(x, y, X, Y) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(X, Y);
        ctx.stroke();
        ctx.closePath();
    }

    // 绘制标记
    function drawMarkers() {
        ctx.strokeStyle = "#E0E0E0";
        // 绘制 y
        var oneVal = parseInt(maxValue / totalYNomber);
        ctx.textAlign = "right";
        for (var i = 0; i <= totalYNomber; i++) {
            var markerVal = i * oneVal;
            var xMarker = originX - 5;
            var yMarker = parseInt(cHeight * (1 - markerVal / maxValue)) + cMargin;
            //console.log(xMarker, yMarker+3,markerVal/maxValue,originY);
            ctx.fillText(markerVal, xMarker, yMarker + 3, cSpace); // 文字
            if (i > 0) {
                drawLine(originX, yMarker, originX + cWidth, yMarker);
            }
        }
        // 绘制 x
        ctx.textAlign = "center";
        for (var i = 0; i < tobalBars; i++) {
            var markerVal = dataArr[i][0];
            var xMarker = parseInt(originX + cWidth * (i / tobalBars) + bMargin + bWidth / 2);
            var yMarker = originY + 15;
            ctx.fillText(markerVal, xMarker, yMarker, cSpace); // 文字
        }
        // 绘制标题 y
        ctx.save();
        ctx.rotate(-Math.PI / 2);
        ctx.fillText("产 量", -canvas.height / 2, cSpace - 10);
        ctx.restore();
        // 绘制标题 x
        ctx.fillText("年份", originX + cWidth / 2, originY + cSpace / 2 + 10);
    };

    //绘制柱形图
    function drawBarAnimate(mouseMove) {
        for (var i = 0; i < tobalBars; i++) {
            var oneVal = parseInt(maxValue / totalYNomber);
            var barVal = dataArr[i][1];
            var barH = parseInt(cHeight * barVal / maxValue * ctr / numctr);
            var y = originY - barH;
            var x = originX + (bWidth + bMargin) * i + bMargin;
            drawRect(x, y, bWidth, barH, mouseMove); //高度减一避免盖住x轴
            ctx.fillText(parseInt(barVal * ctr / numctr), x + 15, y - 8); // 文字
        }
        if (ctr < numctr) {
            ctr++;
            setTimeout(function() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawLineLabelMarkers();
                drawBarAnimate();
            }, speed);
        }
    }

    //绘制方块
    function drawRect(x, y, X, Y, mouseMove) {

        ctx.beginPath();
        ctx.rect(x, y, X, Y);
        if (mouseMove && ctx.isPointInPath(mousePosition.x, mousePosition.y)) { //如果是鼠标移动的到柱状图上，重新绘制图表
            ctx.fillStyle = "green";
        } else {
            ctx.fillStyle = gradient;
            ctx.strokeStyle = gradient;
        }
        ctx.fill();
        ctx.closePath();
    }
}

const data = [
    [2007, 750],
    [2008, 425],
    [2009, 960],
    [2010, 700],
    [2011, 800],
    [2012, 975],
    [2013, 375],
    [2014, 775]
];
//goBarChart(data)

/*
 *
 * 柱状条 动画
 *
 */

const canvas = document.getElementById('barChart')
const ctx = canvas.getContext('2d');
let speed = 0.2;
let yCurrentValue = 0;
let yMaxVale = 100;

function barAnimate() {
    //x、y 轴线
    ctx.beginPath();
    ctx.moveTo(0, 0);
    //y
    ctx.lineTo(0, 300);
    //x
    ctx.lineTo(500, 300);
    ctx.strokeStyle = '#fff';
    ctx.stroke();


    //画一个柱状条
    //它的各个坐标点如下 x 坐标的中点 高度为100 宽度20
    // topLeft      (240, 200)
    // topRight     (260, 200)
    // bottomLeft   (240, 300)
    // bottomRight  (260, 300)
    ctx.fillStyle = 'gold';
    ctx.fillRect(240, 300 - yCurrentValue, 20, yCurrentValue);
}

barAnimate();


//画一个动画的柱状条
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    barAnimate();
}

function easeOut() {
    let value = - speed * (speed - 2)
    //let value = speed * speed
    speed = value
    return value;
}



function animate() {
    //yCurrentValue += ((yMaxVale - yCurrentValue) / 2) * 0.1;
    yCurrentValue += easeOut()
    if (yCurrentValue > yMaxVale) {
        window.cancelAnimationFrame(animate);
        if (yCurrentValue < yMaxVale) {
            yCurrentValue = yMaxVale;
            update();
        }
    } else {
        update();
        window.requestAnimationFrame(animate)
    }
}
animate();