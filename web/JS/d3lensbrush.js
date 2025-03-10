(function(d3) {
    d3.svg.lensbrushO = function() {
        var dispatch = d3.dispatch("brushstart", "brush", "brushend"),
            x = null,
            y = null,
            flag = 0,
            bg,
            lens,
            textO,
            extent = [
                null, null, null
            ], 
            dragStartPoint = null,
            oldCenter = null,
            dragable = false,
            resizable = false,
            mouseDistance = null;
        
        var brush = function(g) {
            g.each(function() {
                var g;
                g = d3.select(this);
                
                
                g.style("pointer-events", "all");
                g.on("mousedown", startBrush);
                g.on("mousemove", lensSize);
               g.on("mouseup", endBrush);
               
              //  bg = g.selectAll(".background").data([0]);
//                bg.enter().append("rect")
//                    .attr("class", "background")
//                    .style("visibility", "hidden")
//                    .style("cursor", "crosshair");
                if (x) {
                    e = scaleBrushDimensions(x.range());
                  //  bg.attr("x", e[0]).attr("width", e[1] - e[0]);
                }
                if (y) {
                    e = scaleBrushDimensions(y.range());
                  //  bg.attr("y", e[0]).attr("height", e[1] - e[0]);
                }
                lens = g.selectAll(".lensO").data([extent]);
                lens.enter().append("circle")
                    .attr("class", "lensO")
                  .style("cursor", "move")
                    .attr("fill", "rgba(255, 165, 0, 0.2)")
                    .attr("stroke-width", "2")
                    .attr("stroke", "grey");  
               textO = g.selectAll(".textO").data([extent]);
 			   textO.enter().append('text')
 					.attr('class', 'textO')
 					.attr("fill","grey")
 					.attr("font-weight","bold")
 					.attr("font-size",25)
 					.text('O');	
            });
        };
        
        var startBrush = function() {
           // if (flag === 0) {
        	 if (flag === 0 ) {
                flag = 1;
                extent[0] = d3.mouse(this)[0];
                extent[1] = d3.mouse(this)[1];
                extent[2] = 5;
               // bg.style("cursor", "crosshair");
                updateLens();
                dispatch.brushstart();
            } else if (flag === 3) {
                mouseDistance = pointDistance(d3.mouse(this), extent);
                resizable = (-3 < (extent[2] - mouseDistance)) &&  ((extent[2] - mouseDistance) < 3) ? true : false;
                dragable = (mouseDistance <= extent[2]) && !resizable ? true : false;
                if (!dragable && !resizable) {
                    flag = 1;
                    extent[0] = d3.mouse(this)[0];
                    extent[1] = d3.mouse(this)[1];
                    extent[2] = 5;
                  //  bg.style("cursor", "crosshair");
                    dispatch.brushstart();
                }
                if (dragable) {
                    dragStartPoint = d3.mouse(this);
                    oldCenter = [extent[0], extent[1]];
                }
                updateLens();
            }
        };
        
        var lensSize = function() {
            if (flag === 1 || flag === 2) {
                flag = 2;
                extent[2] = pointDistance(d3.mouse(this), extent);
                updateLens();
                dispatch.brush();
            } else if (dragable) {
                extent[0] = oldCenter[0] + (d3.mouse(this)[0] - dragStartPoint[0]);
                extent[1] = oldCenter[1] + (d3.mouse(this)[1] - dragStartPoint[1]);
                updateLens();
                dispatch.brush();
            } else if (resizable) {
                extent[2] = pointDistance(d3.mouse(this), extent);
                updateLens();
                dispatch.brush();
            }
            mouseDistance = pointDistance(d3.mouse(this), extent);
            if (flag !== 1 && flag !== 2 && (-3 < (extent[2] - mouseDistance)) &&  ((extent[2] - mouseDistance) < 3)) {
               // bg.style("cursor", "crosshair");
                lens.style("cursor", "crosshair");
            } else {
               // bg.style("cursor", "default");
                lens.style("cursor", "move");
            }
        };
        
        var endBrush = function() {
            if (flag === 1 || flag === 2) {
                extent[2] = pointDistance(d3.mouse(this), extent);
                if (extent[2] < 2) {
                    flag = 0;
                   // bg.style("cursor", "crosshair");
                    nullLens();
                } else {
                    flag = 3;
                    //bg.style("cursor", "default");
                }
                updateLens();
                dispatch.brushend();
            } else if (dragable) {
                dragable = false;
                dragStartPoint = null;
                oldCenter = null;
                dispatch.brushend();
            } else if (resizable) {
                resizable = false;
                dispatch.brushend();
            }
        };
        
        var pointDistance = function(p1, p2) {
            return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
        };
        
        var updateLens = function() {
        	textO.attr("x",extent[0]-extent[2]/Math.SQRT2-15)
			     .attr("y",extent[1]-extent[2]/Math.SQRT2-8);
        	
            lens.attr("cx", extent[0])
                .attr("cy", extent[1])
                .attr("r", extent[2]);
        };
        
        var nullLens = function() {
            extent[0] = null;
            extent[1] = null;
            extent[2] = null;
        };
        
        var scaleBrushDimensions = function(domain) {
            return (domain[0] > domain[1]) ? [domain[1], domain[0]] : [domain[0], domain[1]];
        };
        
        brush.x = function(p) {
            if (!arguments.length)
                return x;
            x = p;
            return brush;
        };
        
        brush.y = function(p) {
            if (!arguments.length)
                return y;
            y = p;
            return brush;
        };
        brush.extent = function(p) {
            if (!arguments.length)
                return extent;
            extent = p;
            return brush;
        };
        
        brush.isWithinLens = function(x, y) {
            return pointDistance([x, y], extent) <= extent[2] ? true : false;
        };
        
        d3.rebind(brush, dispatch, "on");
        
        return brush;
    };
    
    
    d3.svg.lensbrushD = function() {
        var dispatch = d3.dispatch("brushstart", "brush", "brushend"),
            x = null,
            y = null,
            flag = 0,
            bg,
            lens,
            textD,
            extent = [
                null, null, null
            ], 
            dragStartPoint = null,
            oldCenter = null,
            dragable = false,
            resizable = false,
            mouseDistance = null;
        
        var brush = function(g) {
            g.each(function() {
                var g;
                g = d3.select(this); 
                g.style("pointer-events", "all");
                g.on("mousedown", startBrush);
                g.on("mousemove", lensSize);
                g.on("mouseup", endBrush);
               
//                bg = g.selectAll(".background").data([0]);
//                bg.enter().append("rect")
//                    .attr("class", "background")
//                    .style("visibility", "hidden")
//                    .style("cursor", "crosshair");
                if (x) {
                    e = scaleBrushDimensions(x.range());
                    //bg.attr("x", e[0]).attr("width", e[1] - e[0]);
                }
                if (y) {
                    e = scaleBrushDimensions(y.range());
                    //bg.attr("y", e[0]).attr("height", e[1] - e[0]);
                }
                lens = g.selectAll(".lensD").data([extent]);
                lens.enter().append("circle")
                    .attr("class", "lensD")
                    .style("cursor", "move")
                    .attr("fill", "rgba(255, 165, 0, 0.2)")
                    .attr("stroke-width", "2")
                    .attr("stroke", "grey");    
               textD = g.selectAll(".textD").data([extent]);
  			   textD.enter().append('text')
  					.attr('class', 'textD')
  					.attr("fill","grey")
  					.attr("font-weight","bold")
  					.attr("font-size",25)
  					.text('D');	
            });
        };
        
        var startBrush = function() {
            if (flag === 0) {
                flag = 1;
                extent[0] = d3.mouse(this)[0];
                extent[1] = d3.mouse(this)[1];
                extent[2] = 5;
                //bg.style("cursor", "crosshair");
                updateLens();
                dispatch.brushstart();
            } else if (flag === 3) {
                mouseDistance = pointDistance(d3.mouse(this), extent);
                resizable = (-3 < (extent[2] - mouseDistance)) &&  ((extent[2] - mouseDistance) < 3) ? true : false;
                dragable = (mouseDistance <= extent[2]) && !resizable ? true : false;
                if (!dragable && !resizable) {
                    flag = 1;
                    extent[0] = d3.mouse(this)[0];
                    extent[1] = d3.mouse(this)[1];
                    extent[2] = 5;
                   // bg.style("cursor", "crosshair");
                    dispatch.brushstart();
                }
                if (dragable) {
                    dragStartPoint = d3.mouse(this);
                    oldCenter = [extent[0], extent[1]];
                }
                updateLens();
            }
        };
        
        var lensSize = function() {
            if (flag === 1 || flag === 2) {
                flag = 2;
                extent[2] = pointDistance(d3.mouse(this), extent);
                updateLens();
                dispatch.brush();
            } else if (dragable) {
                extent[0] = oldCenter[0] + (d3.mouse(this)[0] - dragStartPoint[0]);
                extent[1] = oldCenter[1] + (d3.mouse(this)[1] - dragStartPoint[1]);
                updateLens();
                dispatch.brush();
            } else if (resizable) {
                extent[2] = pointDistance(d3.mouse(this), extent);
                updateLens();
                dispatch.brush();
            }
            mouseDistance = pointDistance(d3.mouse(this), extent);
            if (flag !== 1 && flag !== 2 && (-3 < (extent[2] - mouseDistance)) &&  ((extent[2] - mouseDistance) < 3)) {
               // bg.style("cursor", "crosshair");
                lens.style("cursor", "crosshair");
            } else {
               // bg.style("cursor", "default");
                lens.style("cursor", "move");
            }
        };
        
        var endBrush = function() {
            if (flag === 1 || flag === 2) {
                extent[2] = pointDistance(d3.mouse(this), extent);
                if (extent[2] < 2) {
                    flag = 0;
                   // bg.style("cursor", "crosshair");
                    nullLens();
                } else {
                   flag = 3;
                    //bg.style("cursor", "default");
                }
                updateLens();
                dispatch.brushend();
            } else if (dragable) {
                dragable = false;
                dragStartPoint = null;
                oldCenter = null;
                dispatch.brushend();
            } else if (resizable) {
                resizable = false;
                dispatch.brushend();
            }
        };
        
        var pointDistance = function(p1, p2) {
            return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
        };
        
        var updateLens = function() {
        	textD.attr("x",extent[0]-extent[2]/Math.SQRT2-15)
			     .attr("y",extent[1]-extent[2]/Math.SQRT2-8);
            lens.attr("cx", extent[0])
                .attr("cy", extent[1])
                .attr("r", extent[2]);
        };
        
        var nullLens = function() {
            extent[0] = null;
            extent[1] = null;
            extent[2] = null;
        };
        
        var scaleBrushDimensions = function(domain) {
            return (domain[0] > domain[1]) ? [domain[1], domain[0]] : [domain[0], domain[1]];
        };
        
        brush.x = function(p) {
            if (!arguments.length)
                return x;
            x = p;
            return brush;
        };
        
        brush.y = function(p) {
            if (!arguments.length)
                return y;
            y = p;
            return brush;
        };
        brush.extent = function(p) {
            if (!arguments.length)
                return extent;
            extent = p;
            return brush;
        };
        
        brush.isWithinLens = function(x, y) {
            return pointDistance([x, y], extent) <= extent[2] ? true : false;
        };
        
        d3.rebind(brush, dispatch, "on");
        
        return brush;
    };
    
})(d3);