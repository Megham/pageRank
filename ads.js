function injectAdd(){
	adhtml = chrome.extension.getURL("./ads_content.html");
	var body_height = $("html").height();
	var body_width = $("html").width();

	//$("body").html("");
	$("body").prepend("<div style='width:"+body_width+"px;'><iframe style='height:90px; width:728px;margin:0px auto; border:1px solid black;z-index: 10000;display:block;\
position: relative;top: 0px;' src='"+adhtml+"'></iframe></div>");
	//$("body").append("<iframe style='height:"+body_height+"px;width:"+body_width+"px' src='"+window.location+"'></iframe>");
//	$("body").append("<div style='width:1000px;'><iframe style='height:90px; width:728px; margin: 0px auto; border:1px solid black;z-index: 10000;\
//position: relative; display:block;\
//bottom: 0px;' src='"+adhtml+"'></iframe></div>");

};

function checkBlackListedUrl(Url){
	var blackListedUrls = ["\\.google\\.","www\\.youtube\\.com","doubleclick\\.net","facebook\\.com"];
	for( x in blackListedUrls ){
		var patt = new RegExp(blackListedUrls[x]);
		if(patt.test(Url)){
			return true;
		}
	}
	return false;
}

$(document).ready(function(){
	if(!checkBlackListedUrl(document.location.hostname)){
		injectAdd();
	}
})