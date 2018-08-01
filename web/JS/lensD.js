function DrawDLens(){

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
	mapObj.setStatus({dragEnable: false});
	drawDlens();
	
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
		.style("r", 2 / Math.pow(1.6, newZoom - mapZoom));
		d3.select(svg).selectAll("#blue")
		.style("r", 2 / Math.pow(1.6, newZoom - mapZoom));
		d3.select(svg).selectAll("#DfromO")
		.style("r", 2 / Math.pow(1.6, newZoom - mapZoom));

	}
}
function drawDlens(){
	
	d3.select(svg).selectAll(".tooltip").remove();
	var tooltip = d3.select("body")
	.append("div")
	.attr("class","tooltip")
	.style("opacity",0.0);	
	
	var brushD = d3.svg.lensbrushD()
				.x(d3.scale.linear().range([0, clientWidth]))
				.y(d3.scale.linear().range([0, clientHeight]))
				.on("brush", function() {
					d3.select(svg).selectAll(".line").remove();
					d3.select(svg).selectAll(".pointDfromO").classed("selected", function(d) {
						//console.log(d);
						var judge=(brushD.isWithinLens(d[2], d[3]) ? true : false);
						if(judge){
							
							var vbox=svg.viewBox.baseVal;
							var w=Number(vbox.width);
							var h=Number(vbox.height);
							var width=Number(svg.getAttribute('width'));
							var height=Number(svg.getAttribute('height'));
							var x_scale=width/w;
							var y_scale=height/h;
							var lf=Number(svg.style.left.replace("px", ""));
							var tp=Number(svg.style.top.replace("px", ""));
//							console.log("lf"+lf);
//							console.log("tp"+tp);
//							console.log("x"+x_scale);
//							console.log("y"+y_scale);
							var lineFunction = d3.svg.line()
							.x(function(d) {
								return (Number(mapObj.lnglatTocontainer(new AMap.LngLat(d[0], d[1])).getX())-lf)/x_scale;})
							.y(function(d) { 
								return (Number(mapObj.lnglatTocontainer(new AMap.LngLat(d[0], d[1])).getY())-tp)/y_scale;})
							//.interpolate('monotone');
						d3.select(svg)
							.append('path')
							.attr('class', 'line')
							.style("stroke", "steelblue")
							.style("stroke-width",2)
							.style("fill", "transparent")
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
					d3.select(svg).selectAll(".tooltip").remove();
					d3.select(svg).selectAll(".line").remove();
					d3.select(svg).selectAll(".pointDfromO").classed("selected", false);
				})
				.on("brushend", function() {
					d3.select(svg).selectAll(".tooltip").remove();
					// do nothing
				});
	//d3.select(svg).append("g")
	d3.select(svg)
	  .call(brushD);


	
}
