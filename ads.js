function injectAdd(){
	adhtml = chrome.extension.getURL("./ads_content.html");
	var body_height = $("html").height();
	var body_width = $("html").width();

	//$("body").html("");
	$("body").prepend("<iframe style='height:90px; width:728px; border:1px solid black;z-index: 10000;display:block;\
position: relative;top: 0px;' src='"+adhtml+"'></iframe>");
	//$("body").append("<iframe style='height:"+body_height+"px;width:"+body_width+"px' src='"+window.location+"'></iframe>");
	$("body").append("<iframe style='height:90px; width:728px; border:1px solid black;z-index: 10000;\
position: relative; display:block;\
bottom: 0px;' src='"+adhtml+"'></iframe>");

};

document.body.onload = injectAdd;