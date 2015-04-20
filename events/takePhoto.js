
var requiredFileCount = 2, currentFileCount = 0;

document.addEventListener("DOMContentLoaded", onDeviceReady, false);
//document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
	addHammerEventListener();
	
	var css = document.createElement("link");
    css.setAttribute("rel", "stylesheet");
    css.addEventListener("load", loadCount);
  
    var s = document.createElement("script");
    s.addEventListener("load", loadCount);
  
  	//css.setAttribute("href", "http://m.edumedia.ca/liao0015/mad9014/weather/css/style.css");
//    s.setAttribute("src", "http://code.jquery.com/jquery-2.1.0.min.js");
//	
//  	document.querySelector("head").appendChild(css);
//  	document.querySelector("head").appendChild(s);
	
	document.getElementById("btnClose").addEventListener("click", closeModalContact);
	document.getElementById("btnCloseMap").addEventListener("click", closeModalMap);
	
	addContact();

	document.addEventListener("scroll", handleScrolling, false);
	
	//setup a ajax call
	var req = new XMLHttpRequest( );
	req.open('POST', 'http://m.edumedia.ca/abcd0001/data/info.xml', false );
	req.onreadystatechange = function( ){
		if( req.readyState == 4){
			if( req.status == 200){
				//we have the info.xml page loaded
				console.log(req.responseText);
				//the req object will contain two main properties - req.responseText and req.responseXML
				//responseText is used for JSON. 
				//responseXML is used for XML.
				console.log(req.responseXML);
				//or save into a file
				var xmlDoc = req.responseXML;
			}
		}
	}
	req.send( null ); 
}

function addHammerEventListener(ev){
	var tar = document.querySelector("[data-role=listview]");
	var mc = new Hammer(tar, {});
	
	var singleTap = new Hammer.Tap({event: 'tap'});
	var doubleTap = new Hammer.Tap({event:'doubletap', taps:2, threshold:10, posThreshold:25});
	mc.add([doubleTap, singleTap]);
	
	doubleTap.requireFailure(singleTap);
	
	mc.on("tap", function(ev){
		document.querySelector("[data-role=modal]").style.display = "block";
		document.querySelector("[data-role=overlay]").style.display = "block";
		showInfor(ev);
	});
	mc.on("doubletap", function(ev){
		document.querySelector("[data-role=map]").style.display = "block";
		document.querySelector("[data-role=overlay]").style.display = "block";
		getGeolocation(ev);
	});
}


