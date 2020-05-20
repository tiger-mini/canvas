;
(function() {

    const HelpRect = window.HelpRect = {

    	//绘制一个圆角矩形
        drawRoundedRect: function(rect, r, ctx) {
            const { x, y, w, h } = rect;
            if (w < 2 * r) r = w / 2;

            if (h < 2 * r) r = h / 2;
            ctx.beginPath();
            ctx.moveTo(x + r, y);
            ctx.arcTo(x + w, y, x + w, y + h, r);
            ctx.arcTo(x + w, y + h, x, y + h, r);
            ctx.arcTo(x, y + h, x, y, r);
            ctx.arcTo(x, y, x + w, y, r);
            ctx.closePath();
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
            ctx.fill();
            ctx.stroke();
        }
    }
})();