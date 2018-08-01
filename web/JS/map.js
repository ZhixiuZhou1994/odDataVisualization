// JavaScript Document
var mapObj = new AMap.Map("container", {
	zoom: 15,
	doubleClickZoom: false,
	keyboardEnable: false,
	rotateEnable: false
});
document.getElementById("keyword").onkeyup = keydown;
function autoSearch() {
	var keywords = document.getElementById("keyword").value;
	var auto;
	AMap.service(["AMap.Autocomplete"], function() {
		var autoOptions = {
			city: "杭州"
		};
		auto = new AMap.Autocomplete(autoOptions);
		if(keywords.length > 0) {
			auto.search(keywords, function(status, result) {
				autocomplete_CallBack(result);
			});
		} else {
			document.getElementById("searchresult").style.display = "none";
		}
	});
}
function autocomplete_CallBack(data) {
	var resultStr = "";
	var tipArr = data.tips;
	if(tipArr && tipArr.length > 0) {
		for (var i = 0; i < tipArr.length; i++) {
			resultStr += "<div id=\"divid" + (i + 1) +"\" onmouseover=\"onSearchResult(this)\" onclick=\"selectResult(" + i + ")\" onmouseout=\"outSearchResult(this)\" style=\"font-size: 13px; cursor: pointer; padding: 5px 5px 5px 5px;\" data=" + tipArr[i].adcode + ">" + tipArr[i].name + "<span style='color:#C1C1C1;'>" + tipArr[i].district + "</span></div>";
		}
	} else {
		resultStr = "没有与搜索条件匹配的项";
	}
	document.getElementById("searchresult").curSelect = -1;
	document.getElementById("searchresult").tipArr = tipArr;
	document.getElementById("searchresult").innerHTML = resultStr;
	document.getElementById("searchresult").style.display = "block";
}
function onSearchResult(thiss) {
	thiss.style.background = "#CAE1FF";
}
function outSearchResult(thiss) {
	thiss.style.background = "";
}
function selectResult(index) {
	var text = document.getElementById("divid" + (index + 1)).innerHTML.replace(/<[^>].*?>.*<\/[^>].*?>/g, "");
	var cityCode = document.getElementById("divid" + (index + 1)).getAttribute("data");
	document.getElementById("keyword").value = text;
	document.getElementById("searchresult").style.display = "none";
	mapObj.plugin(["AMap.PlaceSearch"], function() {
		var msearch = new AMap.PlaceSearch();
		AMap.event.addListener(msearch, "complete", placeSearch_CallBack);
		msearch.setCity(cityCode);
		msearch.search(text);
	});
	globalDataClick = false;
	imgNoOpacity();
}
function placeSearch_CallBack(data) {
	windowsArr = [];
	marker = [];
	mapObj.clearMap();
	var poiArr = data.poiList.pois;
	var resultCount = poiArr.length;
	for (var i = 0; i < resultCount; i++) {
		addmarker(i, poiArr[i]);
	}
	mapObj.setFitView();
}
function addmarker(i, d) {
	var lngX = d.location.getLng();
	var latY = d.location.getLat();
	var markerOption = {
		map: mapObj,
		icon: "http://webapi.amap.com/images/" + (i + 1) + ".png",
		position: [lngX, latY]
	};
	new AMap.Marker(markerOption);
	marker.push([lngX, latY]);
}
function keydown(event) {
	var key = (event || window.event).keyCode;
	var result = document.getElementById("searchresult")
	var cur = result.curSelect;
	if(key === 40) {
		if(cur + 1 < result.childNodes.length) {
			if(result.childNodes[cur]) {
				result.childNodes[cur].style.background = "";
			}
			result.curSelect = cur + 1;
			result.childNodes[cur + 1].style.background = "#CAE1FF";
			document.getElementById("keyword").value = result.tipArr[cur + 1].name;
		}
	} else if(key === 38) {
		if(cur - 1 >= 0) {
			if(result.childNodes[cur]) {
				result.childNodes[cur].style.background = "";
			}
			result.curSelect = cur - 1;
			result.childNodes[cur - 1].style.background = "#CAE1FF";
			document.getElementById("keyword").value = result.tipArr[cur - 1].name;
		}
	} else if(key === 13) {
		var res = document.getElementById("searchresult");
		if(res && res.curSelect !== -1) {
			selectResult(document.getElementById("searchresult").curSelect);
		}
	} else {
		autoSearch();
	}
}