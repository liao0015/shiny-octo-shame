

document.addEventListener("DOMContentLoaded", onDeviceReady, false);
//document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
	addHammerEventListener();
	
	document.getElementById("btnClose").addEventListener("click", closeModalContact);
	document.getElementById("btnCloseMap").addEventListener("click", closeModalMap);
	
	addContact();

	document.addEventListener("scroll", handleScrolling, false);
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