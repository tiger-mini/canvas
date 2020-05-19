;
(function() {
    const HelperUtils = window.HelperUtils = {
        //判断点是否在多边行内
        isInPolygon: function(checkPoint, polygonPoints) {
            var counter = 0;
            var i;
            var xinters;
            var p1, p2;
            var pointCount = polygonPoints.length;
            p1 = polygonPoints[0];

            for (i = 1; i <= pointCount; i++) {
                p2 = polygonPoints[i % pointCount];
                if (
                    checkPoint[0] > Math.min(p1[0], p2[0]) &&
                    checkPoint[0] <= Math.max(p1[0], p2[0])
                ) {
                    if (checkPoint[1] <= Math.max(p1[1], p2[1])) {
                        if (p1[0] != p2[0]) {
                            xinters =
                                (checkPoint[0] - p1[0]) *
                                (p2[1] - p1[1]) /
                                (p2[0] - p1[0]) +
                                p1[1];
                            if (p1[1] == p2[1] || checkPoint[1] <= xinters) {
                                counter++;
                            }
                        }
                    }
                }
                p1 = p2;
            }
            if (counter % 2 == 0) {
                return false;
            } else {
                return true;
            }
        },
        //判断是否在巨星内
        isInRect: function(checkPoint, rect) {
            const { x, y } = checkPoint;
            const { x0, y0, x1, y1, x2, y2, x3, y3 } = rect;
            if (x0 < x && x2 > x && y0 > y && y1 < y) {
                return true
            } else {
                return false
            }
        }
    }
})();