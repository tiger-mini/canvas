//原文地址 https://juejin.im/entry/5981375d6fb9a03c3f404c91
;
(function(window) {

    const mW = 400;
    const mH = 400;


    // 多边形变量
    const mCount = 6;
    const mCenter = mW / 2;
    const mRadius = mCenter - 50;
    const mAngle = Math.PI * 2 / mCount;
    const mColorPolygon = '#B8B8B8';
    const mColorForPolygonSecondLine = '#e9e9e9'
    const mColorForPolygonText = '#000000';

    var mData = [
        ['速度', 77],
        ['力量', 72],
        ['防守', 46],
        ['射门', 50],
        ['传球', 80],
        ['耐力', 60]
    ]; //数据



    ;
    (function() {
        //获取canvas  
        const canvas = document.getElementById('mychart');
        const mCtx = canvas.getContext('2d');


        //绘制方法
        drawPolygon(mCtx);
        drawLines(mCtx);
        drawDataText(mCtx);
        drawRegion(mCtx);
        const pointObj = new drawDataPoint(mCtx);

        //点击 事件
        canvas.addEventListener('click', function(e) {
                pointObj.click && pointObj.click(e);
                pointObj.hover && pointObj.hover(e);
        });

    })();

    //绘制多边形 
    function drawPolygon(ctx) {

        ctx.save();

        ctx.strokeStyle = mColorPolygon;
        var r = mRadius / mCount;

        // 画6个圈
        for (let i = 0; i < mCount; i++) {
            ctx.beginPath();
            const currR = r * (i + 1);
            // 画6条边 
            for (let j = 0; j < mCount; j++) {
                var x = mCenter + currR * Math.cos(mAngle * j);
                var y = mCenter + currR * Math.sin(mAngle * j);

                ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.stroke();
        }
        ctx.restore();
    }

    //绘制连线
    function drawLines(ctx) {
        ctx.save();

        ctx.beginPath();
        ctx.strokeStyle = mColorForPolygonSecondLine;
        var r = mRadius / mCount;

        for (let i = 0; i < mCount; i++) {
            ctx.beginPath();
            ctx.lineTo(mCenter, mCenter);
            var x = mCenter + (r * 6) * Math.cos(mAngle * i);
            var y = mCenter + (r * 6) * Math.sin(mAngle * i);
            ctx.lineTo(x, y);
            ctx.stroke();
        }

        ctx.restore();
    }

    //绘制文本
    function drawDataText(ctx) {
        ctx.save();
        var r = mRadius / mCount;
        for (let i = 0; i < mCount; i++) {

            const text = (mData && mData[i] && mData[i][0]) || '--';
            var x = mCenter + (r * 6) * Math.cos(mAngle * i);
            var y = mCenter + (r * 6) * Math.sin(mAngle * i);
            ctx.fillText(text, x, y, 100)

        }

        ctx.restore();
    }

    //绘制数据覆盖区域
    function drawRegion(ctx) {
        ctx.save();
        ctx.beginPath();

        for (let i = 0; i < mCount; i++) {
            const x = mCenter + (mData[i][1]) * Math.cos(mAngle * i);
            const y = mCenter + (mData[i][1]) * Math.sin(mAngle * i);
            ctx.lineTo(x, y)
        }

        ctx.closePath();
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.fill();

        ctx.restore();
    }

    function drawDataPoint(ctx) {
        ctx.save();

        for (let i = 0; i < mCount; i++) {
            ctx.beginPath();
            const x = mCenter + (mData[i][1]) * Math.cos(mAngle * i);
            const y = mCenter + (mData[i][1]) * Math.sin(mAngle * i);
            const startRad = Math.PI * 0;
            const endRad = Math.PI * 2;
            const anticlockwise = false;
            ctx.arc(x, y, 4, startRad, endRad, anticlockwise);
            ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
            ctx.fill();
        }
        ctx.restore();

        this.click = function(e) {
            const x = e.clientX;
            const y = e.clientY;
            if (Math.pow(x - 50, 2) + Math.pow(y - 50, 2) < Math.pow(50, 2)) {
                console.log('eeeeeee', e)
            }
        }

        this.hover = function(e) {
            console.log('event hover')
        }
    }

})(window);