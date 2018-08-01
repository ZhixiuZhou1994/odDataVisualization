var cluster, markers= [];
function choose(){
	d3.select(".OAggregate").style("dislay", "block");
	d3.select(".DAggregate").style("dislay", "block");
	
}
function showchoose(){
	d3.select(".OAggregate").style("display", "block");
	d3.select(".DAggregate").style("display", "block");
	}
function hidechoose(){
	d3.select(".OAggregate").style("display", "none");
	d3.select(".DAggregate").style("display", "none");
	}

function GetAllOJH() {
	var jsonData = new Object();
	addDateTimeSection(jsonData);
	
	$.ajax({
		url: "GetAllOJH",
		type: "POST",
		dataType: "json",
		data: jsonData,
		beforeSend: function() {
			
			d3.select("#loading")
				.style("visibility", "visible")
				.style("opacity", "0.5")
				.style("left", clientWidth / 2 - 200 + "px")
				.style("top", clientHeight / 2 - 150 + "px");
		},
		success: function(AllO) {
			d3.select("#loading")
			.style("visibility", "hidden");
		if(AllO.length === 0) {
			alert("没有数据");
			return;
		}
		Juhe(AllO);
		
		
	}
	});
}
function GetAllDJH() {
	
	$.ajax({
		url: "GetAllDJH",
		type: "POST",
		dataType: "json",
		beforeSend: function() {
			
			d3.select("#loading")
				.style("visibility", "visible")
				.style("opacity", "0.5")
				.style("left", clientWidth / 2 - 200 + "px")
				.style("top", clientHeight / 2 - 150 + "px");
		},
		success: function(AllD) {
			d3.select("#loading")
			.style("visibility", "hidden");
		if(AllD.length === 0) {
			alert("没有数据");
			return;
		}
		Juhe(AllD);
		
		
	}
	});
}
function Juhe(All){
	mapObj.clearMap();
    for (var i = 0; i < All.length; i ++) {  
        var markerPosition = new AMap.LngLat(All[i][0],All[i][1]);  
        var marker = new AMap.Marker({  
            map:mapObj,  
            position:markerPosition, //基点位置  
            icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png", //marker图标，直接传递地址url  
            offset:{x:-8,y:-34} //相对于基点的位置  
        });  
        markers.push(marker);  
    }  
    
    
    
   addCluster(0);
}
function addCluster(tag) {
    if (cluster) {
    	cluster.clearMarkers( );
        cluster.setMap(null);
    }
    if (tag == 1) {
        var sts = [{
            url: "http://lbs.amap.com/wp-content/uploads/2014/06/1.png",
            size: new AMap.Size(32, 32),
            offset: new AMap.Pixel(-16, -30)
        }, {
            url: "http://lbs.amap.com/wp-content/uploads/2014/06/2.png",
            size: new AMap.Size(32, 32),
            offset: new AMap.Pixel(-16, -30)
        }, {
            url: "http://lbs.amap.com/wp-content/uploads/2014/06/3.png",
            size: new AMap.Size(48, 48),
            offset: new AMap.Pixel(-24, -45),
            textColor: '#CC0066'
        }];
        mapObj.plugin(["AMap.MarkerClusterer"], function() {
            cluster = new AMap.MarkerClusterer(map, markers, {
                styles: sts
            });
        });
    } else {
    	mapObj.plugin(["AMap.MarkerClusterer"], function() {
            cluster = new AMap.MarkerClusterer(mapObj, markers);
        });
    }
}

