;(function() {
	var canvas = document.body.appendChild(document.createElement('canvas'));
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');

    var points = [
        { x: 100, y: 100 },
        { x: 200, y: 200 },
        { x: 300, y: 400 },
        { x: 400, y: 200 },
        { x: 500, y: 100 }
    ] //took 5 example
    ctx.moveTo((points[0].x), points[0].y);
    for (var i = 0; i < points.length - 1; i++) {
        var x_mid = (points[i].x + points[i + 1].x) / 2;
        var y_mid = (points[i].y + points[i + 1].y) / 2;
        var cp_x1 = (x_mid + points[i].x) / 2;
        var cp_x2 = (x_mid + points[i + 1].x) / 2;
        ctx.quadraticCurveTo(cp_x1, points[i].y, x_mid, y_mid);
        ctx.quadraticCurveTo(cp_x2, points[i + 1].y, points[i + 1].x, points[i + 1].y);
    }
    ctx.stroke();

    points.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
        ctx.stroke();
    });


})();