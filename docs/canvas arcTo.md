# Canvas 的 arcTo 使用

** 介绍下 canvasRenderingContext2D对象的 arcTo 方法 **

```javascript
arcTo(x1, y1, x2, y2, radius)
```
arcTo() 利用当前端的端点、端点1 (x1, y1)、端点2 (x2, y2)，这三个点所形成的夹角，绘制一段与夹角的两边相切并且半径为radius的圆上弧线。<font color='red'>此外，如果当前端点不是弧线的起点，ARCTO()方法还加添加一条直线（当前端点到弧线起点）。</font>

如下例子：
```javascript
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>HTML5 Canvas arcTo()绘制弧线入门示例</title>
</head>
<body>

	<!-- 添加canvas标签，并加上红色边框以便于在页面上查看 -->
	<canvas id="myCanvas" width="400px" height="300px" style="border: 1px solid red;">
	您的浏览器不支持canvas标签。
	</canvas>

	<script type="text/javascript">
	//获取Canvas对象(画布)
	var canvas = document.getElementById("myCanvas");
	//简单地检测当前浏览器是否支持Canvas对象，以免在一些不支持html5的浏览器中提示语法错误
	if(canvas.getContext){  
		//获取对应的CanvasRenderingContext2D对象(画笔)
		var ctx = canvas.getContext("2d");  

		//指定绘制路径的起始点
		ctx.moveTo(50, 50);
		//绘制一条到坐标(150,50)的水平直线
		ctx.lineTo(150, 50);

		//坐标点(150,50)就是绘制弧线时的当前端点

		//端点1
		var p1 = {
			x : 200,
			y : 50
		};
		//端点2
		var p2 = {
			x : 200,
			y : 100    		
		};
		//绘制与当前端点、端点1、端点2三个点所形成的夹角的两边相切并且半径为50px的圆的一段弧线
		ctx.arcTo(p1.x, p1.y, p2.x, p2.y, 50);

		//设置线条颜色为蓝色
		ctx.strokeStyle = "blue";
		//按照上述绘制路径绘制弧线
		ctx.stroke();
	}
	</script>
</body>
</html>
```
对应的显示效果图如下：
![示意图片](https://cdn.codeplayer.vip/old/canvas-arcto-1.png!cp)

再来一个当前端点不是弧线起点的例子：
``` javascript
<script type="text/javascript">
//获取Canvas对象(画布)
var canvas = document.getElementById("myCanvas");
//简单地检测当前浏览器是否支持Canvas对象，以免在一些不支持html5的浏览器中提示语法错误
if(canvas.getContext){  
    //获取对应的CanvasRenderingContext2D对象(画笔)
    var ctx = canvas.getContext("2d");  
    
    //指定绘制路径的起始点
    ctx.moveTo(50, 50); 
    //注释掉lineTo()，不再先绘制直线   
    //ctx.lineTo(150, 50);
    
    //此时，坐标点(50,50)就是绘制弧线时的当前端点
    
    //端点1
    var p1 = {
    	x : 200,
    	y : 50
    };
    //端点2
    var p2 = {
    	x : 200,
    	y : 100    		
    };
    //绘制与当前端点、端点1、端点2三个点所形成的夹角的两边相切并且半径为50px的圆的一段弧线
    ctx.arcTo(p1.x, p1.y, p2.x, p2.y, 50);
    
    //设置线条颜色为蓝色
    ctx.strokeStyle = "blue";
    //按照上述绘制路径绘制弧线
    ctx.stroke();
}
</script>

```
对应的显示效果如下：
![显示图片](https://cdn.codeplayer.vip/old/canvas-arcto-2.png!cp)

通过观察会发现，两种情况下绘制的图形是一样的。在第二中图形中，并没有先绘制一条直线，但是，在绘制弧线时，起始点(50, 50) 就是当前端点，所以，arcTo()将会利用起始点(50, 50), 端点1(200,50)、端点2(200,100)所形成的夹角，然后绘制一段与夹角两边相切的圆弧。

<font color='red' style='font-weight: bold'>由于起始点(50,50)和端点1(200,50)所在的直线与第1个例子中当前端点(150,50)和端点1(200,50)所在的直线实际上是同一条直线，所以绘制出来的圆弧依然相同。不同的是，此时的当前端点并不是圆弧的起点，arcTo()就会自动添加一条当前端点到圆弧起点的直线。于是，我们就看到了与第1个实例代码完全相同的图形效果。</font>


















