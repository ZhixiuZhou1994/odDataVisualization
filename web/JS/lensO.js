function DrawOLens(){
	var lnglatMin = mapObj.containTolnglat(new AMap.Pixel(0, clientHeight));
	var lnglatMax = mapObj.containTolnglat(new AMap.Pixel(clientWidth, 0));
	//alert(svg);
	if(svg==null){mapObj.plugin("AMap.CustomLayer", function() {
		svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		d3.select(svg)
			.attr("viewBox", 0 + " " + 0 + " " + clientWidth + " " + clientHeight)
			.attr("id", "DataSvg")
			.attr("width", clientWidth)
			.attr("height", clientHeight)
			.style("position", "absolute");
		//drawOlens();

		var cus = new AMap.CustomLayer(svg, {
			map: mapObj
		});
		cus.render = onORender;
	});}
	//cus.show();
	//mapObj.setStatus({dragEnable: false});
	drawOlens();

	function onORender() {
		var xyMin = mapObj.lnglatTocontainer(new AMap.LngLat(lnglatMin.getLng(), lnglatMax.getLat()));
		var xyMax = mapObj.lnglatTocontainer(new AMap.LngLat(lnglatMax.getLng(), lnglatMin.getLat()));
		d3.select(svg)
			.attr("width", xyMax.getX() - xyMin.getX())
			.attr("height", xyMax.getY() - xyMin.getY())
			.style("left", xyMin.getX() + "px")
			.style("top", xyMin.getY() + "px");
		var newZoom = mapObj.getZoom();
		//mapZoom = mapObj.getZoom();
		d3.select(svg).selectAll("#red")
			.style("r", 3 / Math.pow(1.6, newZoom - mapZoom));
		d3.select(svg).selectAll("#blue")
			.style("r", 3 / Math.pow(1.6, newZoom - mapZoom));
		d3.select(svg).selectAll(".pointDfromO")
			.style("r", 3 / Math.pow(1.6, newZoom - mapZoom));

	}
}
function drawOlens(){
	d3.select(svg).selectAll(".tooltip").remove();
	var tooltip = d3.select("body")
		.append("div")
		.attr("class","tooltip")
		.style("opacity",0.0);
	var brushO = d3.svg.lensbrushO()
		.x(d3.scale.linear().range([0, clientWidth]))
		.y(d3.scale.linear().range([0, clientHeight]))
		.on("brush", function() {
			mapObj.setStatus({dragEnable: false});
			d3.select(svg).selectAll(".pointDfromO").remove();//透镜O重新绘制，删除对应的D点
			d3.select(svg).selectAll(".line").remove();//透镜O重新绘制，删除上次选中O点对应的轨迹
			d3.select(svg).selectAll(".pointO").classed("selected", function(d,i) {
				//console.log(d);
				var judge=(brushO.isWithinLens(d[0], d[1]) ? true : false);
				if(judge){
					//console.log(d);
					var ary = [];//定义一个数组，未指定长度
					ary[0] = d;//可以动态的添加元素
					d3.select(svg)
						.selectAll("circle #Dpoint"+i)
						.data(ary)
						.enter()
						.append("circle")
						.attr("cx",ary[0][2])
						.attr("cy",ary[0][3])
						.attr("r",3)
						.attr("fill","#06C56D")
						.attr("class", function(d, i) {return "pointDfromO"; });

					var vbox=svg.viewBox.baseVal;
					var w=Number(vbox.width);
					var h=Number(vbox.height);
					var width=Number(svg.getAttribute('width'));
					var height=Number(svg.getAttribute('height'));
					var x_scale=width/w;
					var y_scale=height/h;
					var lf=Number(svg.style.left.replace("px", ""));
					var tp=Number(svg.style.top.replace("px", ""));


					var lineFunction = d3.svg.line()
						.x(function(d) {
							return (Number(mapObj.lnglatTocontainer(new AMap.LngLat(d[0], d[1])).getX())-lf)/x_scale;})
						.y(function(d) {
							return (Number(mapObj.lnglatTocontainer(new AMap.LngLat(d[0], d[1])).getY())-tp)/y_scale;})
					//.interpolate('monotone');
					d3.select(svg)
						.append('path')
						.attr('class', 'line')
						.style("stroke", "#386cb0")
						.style("stroke-width",4)
						.style("fill", "transparent")
						.style("stroke-opacity",0.6)
						.attr('d', lineFunction(d[4]))
						.on("mouseover",function(){
							tooltip.html("行程历时" + "<br />" + d[5]+ "分钟")
								.style("left", (d3.event.pageX) + "px")
								.style("top", (d3.event.pageY+ 20) + "px")
								.style("opacity",1.0);
						})
						.on("mousemove",function(d){
							tooltip.style("left", (d3.event.pageX) + "px")
								.style("top", (d3.event.pageY + 20) + "px");
						})
						.on("mouseout",function(){
							tooltip.style("opacity",0.0);

						});


				}

				return judge;

			});

		})
		.on("brushstart", function() {
			//	tooltip.style("opacity",0.0);
			d3.select(svg).selectAll(".tooltip").remove();
			d3.select(svg).selectAll(".pointDfromO").remove();
			d3.select(svg).selectAll(".pointO").classed("selected", false);
		})
		.on("brushend", function() {
			d3.select(svg).selectAll(".tooltip").remove();
			mapObj.setStatus({dragEnable: true});});


	//d3.select(svg).append("g")
	d3.select(svg)
		.call(brushO);



}



















