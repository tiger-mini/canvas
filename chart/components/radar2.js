;
(function(window) {

    //变量
    const mW = 400;
    const mH = 400;
    const mCount = 6; //边数 
    const mCenter = mW / 2; //中心点
    const mRadius = mCenter - 50; //半径(减去的值用于给绘制的文本留空间)
    const mAngle = Math.PI * 2 / mCount; //角度
    let mCtx = null;
    const mColorPolygon = '#B8B8B8'; //多边形颜色
    const mColorLines = '#B8B8B8'; //顶点连线颜色
    const mColorText = '#000000';

    //初始化
    ;
    (function() {
        var canvas = document.getElementById('mychart');
        mCtx = canvas.getContext('2d');
        drawPolygon(mCtx);


    })();

    function drawPolygon(ctx) {

        ctx.save();

        ctx.strokeStyle = mColorPolygon;
        var r = mRadius / mCount; //单位半径

        //画6个圈
        for (var i = 0; i < mCount; i++) {
            ctx.beginPath();
            var currR = r * (i + 1); //当前半径
            //画6条边
            for (var j = 0; j < mCount; j++) {
                var x = mCenter + currR * Math.cos(mAngle * j);
                var y = mCenter + currR * Math.sin(mAngle * j);

                ctx.lineTo(x, y);
            }
            ctx.closePath()
            ctx.stroke();
        }

        ctx.restore();

    }


})(window);